import React from "react";
import '../App'

const Profile=()=>{
    const auth = localStorage.getItem('key')
    return(
        <div className="App">
            <table className="profile-table">
            <tbody >
                <tr>
                    <td>User</td>
                    <td>{JSON.parse(auth).name}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{JSON.parse(auth).email}</td>
                </tr>
                <tr>
                    <td>User Id</td>
                    <td>{JSON.parse(auth)._id}</td>
                </tr>
            </tbody>
            </table>
        </div>
    )
}
export default Profile;