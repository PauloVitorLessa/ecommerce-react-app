import { useEffect, useState } from "react";
import Loading from '../../assets/loading.png'
import {
  ContentContainer,
  UsersContainer,
  UserCard,
  LoadingContainer,
} from './AboutUs';

function AboutUs() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {

      const usernames = ["AllanFerreiraGomes", "caioOliveiraF", "PauloVitorLessa", "RodolphoGLC", "tamirys2506", "willtinoco97"];
      const fetchedUsers = [];

      for (const username of usernames) {
        setLoading(true)
        const response = await fetch(`https://api.github.com/users/${username}`);
        const userData = await response.json();
        fetchedUsers.push(userData);
      }

      setUsers(fetchedUsers);
      setLoading(false);
    };

    fetchUserData();
  }, []);

  return (
    <ContentContainer>
      <h3>Integrantes do Grupo - 5</h3>
      <LoadingContainer>
        <h5>GitHub</h5>
        {loading ? <img className="loading" src={Loading} alt="loading"></img> :
          <UsersContainer>
            {
              users.map((user) => (
                <UserCard key={user.login}>
                  <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                    <img src={user.avatar_url} alt={user.login} />
                  </a>
                  <h5>{user.login}</h5>
                </UserCard>
              ))
            }
          </UsersContainer>
        }
      </LoadingContainer>
    </ContentContainer>
  );
}

export default AboutUs;