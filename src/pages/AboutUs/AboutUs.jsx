import { useEffect, useState } from "react";
import { ContentContainer, UsersContainer, UserCard } from './AboutUs';

function AboutUs(){
    const [users, setUsers] = useState([]);

    useEffect(() => {
      const fetchUserData = async () => {
        const usernames = ["AllanFerreiraGomes", "caioOliveiraF", "PauloVitorLessa", "RodolphoGLC", "tamirys2506", "willtinoco97"]; 
        const fetchedUsers = [];
  
        for (const username of usernames) {
          const response = await fetch(`https://api.github.com/users/${username}`);
          const userData = await response.json();
          fetchedUsers.push(userData);
        }
  
        setUsers(fetchedUsers);
      };
  
      fetchUserData();
    }, []);
  
    return (
        <ContentContainer>
          <h3>Integrantes do Grupo - 5</h3>
        <UsersContainer>
        {users.map((user) => (
              <UserCard key={user.login}>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                <img src={user.avatar_url} alt={user.login} />
              </a>
              <h5>{user.login}</h5>
            </UserCard>
          ))}
          </UsersContainer>
        </ContentContainer>
    );
}

export default AboutUs;