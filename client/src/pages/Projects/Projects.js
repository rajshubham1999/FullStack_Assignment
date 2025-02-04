
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import vector from '../../assets/Vector.png';
import { GetAllProjectsByUser } from '../../apicalls/projects';
import { GetCurrentUser } from '../../apicalls/users';
import './Projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const userResponse = await GetCurrentUser();
        if (userResponse.success) {
          const projectsResponse = await GetAllProjectsByUser();
          if (projectsResponse.success) {
            setProjects(projectsResponse.data);
          } else {
            console.error('Failed to fetch projects:', projectsResponse.message);
          }
        } else {
          console.error('Failed to fetch user:', userResponse.message);
        }
      } catch (err) {
        console.error('An error occurred:', err);
      }
    };

    fetchProjects();
  }, []);

  const getInitials = (name) => {
    if (!name) return '';
    const words = name.split(' ');
    if (words.length === 1) {
      return words[0][0];
    }
    return words[0][0] + words[1][0];
  };

  const handleProjectClick = (projectName) => {
    navigate(`/upload/${projectName}/Add your podcast`);
    
  };

  return (
    <div className='main'>
      <Navbar />
      <div className='projectcontainer'>
        <div className='firstcontainer'>
          <p className='projecttext'>Projects</p>
          <div className='buttoncreate'>
            <img src={vector} alt="Create" />
            <button>Create Project</button>
          </div>
        </div>
        <div className='secondcontainer'>
          {projects.map(project => (
            <div
              className='projectdetails'
              key={project._id}
              onClick={() => handleProjectClick(project.name)}
            >
              <div className='projectdetails-left'>
                <p className='shortform'>{getInitials(project.name)}</p>
              </div>
              <div className='projectdetails-right'>
                <div className='projectdetails-right-upper'>
                  <div className='name'>{project.name}</div>
                  <div className='episodes'>{project.episodes.length} episodes</div>
                </div>
                <div className='lastupdated'>
                  Recently Updated
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Projects;
