import { useNavigate } from "react-router-dom"

const LeavePolypay = (props) => {
    const userData = props.userData;
    const navigate = useNavigate()
    
        async function logout(){
            let logout = await fetch('/logout')
            console.log("Trying to logout",logout)
            userData(null)
            navigate('/')
        }
        return (   
            <div>
                <button onClick={logout}
                >Logout</button>
            </div>
        )}

export default LeavePolypay

// in our nav bar, or header or wherever we decide to put this, we should add something like the following
// return (
//     <div>
//       // ...
//       // ... REST OF NAVBAR STUFFS
//       // ...
//       {userData && <LeavePolypay />}
//     </div>
//   );