import { gapi } from 'gapi-script'

const LogOutButton: React.FC = () => {

    const handleLogout = () => {
        gapi.auth2.getAuthInstance().signOut().then(() => {
            console.log('LogOut Success:');
            // setIsAutenticated(false);
        })
    };

    return (
        <div id='LogOutButton'>
            <button onClick={handleLogout}>LogOut</button>
        </div>
    )
}

export default LogOutButton;