import styles from '../styles/pages/Login.module.css'
import { useRouter } from 'next/router'
import { useSession, signIn, signOut, getSession } from 'next-auth/client'
import { useState } from 'react';
import { GetServerSideProps } from 'next';

const Login = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false)

  // const handleLogin = async(e: any) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   await signIn('github');
  //   setIsLoading(true);
  // }

  // const handleLoginFacebook = (e: any) => {
  //   e.preventDefault();
  //   signIn('facebook')
  // }

  // const handleLoginGoogle = (e: any) => {
  //   e.preventDefault();
  //   signIn('google')
  // }

  const handleLoginAuth0 = async (e: any) => {
    e.preventDefault();
    await signIn('auth0')
  }

  const handleLogout = (e: any) => {
    e.preventDefault()
    signOut()
  }

  return (

    <div className={styles.container}>
      <div className={styles.backgroundImage}>
        <img src="/icons/backgroundLogin.svg" alt="Move.it"/>
      </div>

      <div className={styles.content}>
        <img src="/icons/Logo.svg" alt="Move.it"/>
        <strong>Bem-vindo</strong>

        {session? (
          <div className={styles.userSession}>
            <div className={styles.userInfo}>
              <img src={session.image} className="user"/>
              {session.name}
            </div>
            <div className={styles.userAction}>
              <button onClick={handleLogout} className={styles.logout}>Logout</button>
              <button onClick={() => router.push('/home')}>Entrar</button>
            </div>
          </div>
        ) : (
          <>
            <div>
              <p>Faça login para começar</p>
            </div>
            <div className={styles.loginSection}>
              {/* <button onClick={handleLogin} className="logout" disabled={isLoading ? true : false}>
                <img src="/icons/Github.svg" alt="github"/>
                <p>
                  {isLoading ? 'Connecting with Github...' : 'Login com Github'}
                </p> 
              </button>

              <button onClick={handleLoginFacebook} className="logout">
                <img src="/icons/Github.svg" alt="github"/>
                <p>
                  Login com Facebook
                </p> 
              </button>

              <button onClick={handleLoginGoogle} className="logout">
                <img src="/icons/Github.svg" alt="google"/>
                <p>
                  Login com Google
                </p> 
              </button> */}
               {loading 
                ? <h1> LOADING... </h1>
                : 
                  <button onClick={handleLoginAuth0} className="logout">
                    <img src="/icons/Github.svg" alt="auth0"/>
                    <p>
                      Login
                    </p> 
                  </button>
              }
            </div>
          </>
        )}

        {/* <div className={styles.form}>
          <input type="text" placeholder="Github Username"/> 
          <button type="button" onClick={handleLogin}>
            <img src="/icons/arrow.svg" alt="acessar"/>
          </button>
        </div> */}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  const session = await getSession(ctx);

  if(session) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      }
    }
  }

  return {
    props: {
      
    }
  }
}

export default Login;