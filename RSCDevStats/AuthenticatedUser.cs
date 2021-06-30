using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;

namespace RSCDevStats
{
    // AuthenticatedUser.cs
    public interface IUserService
    {
        bool AuthenticateSuccessful(string username, string password);
    }

    public class UserService : IUserService
    {
        //// users hardcoded for simplicity, store in a db with hashed passwords in production applications
        //private List<User> _users = new List<User>
        //{
        //    new User { Id = 1, FirstName = "Test", LastName = "User", Username = "test", Password = "test" }
        //};

        public bool AuthenticateSuccessful(string username, string password)
        {
            if (username == "RSCadmin" && password == "RSCadmin")
            {
                return true;
            }
            else
            {
                return false;
            }
            //// wrapped in "await Task.Run" to mimic fetching user from a db
            //var user = await Task.Run(() => _users.SingleOrDefault(x => x.Username == username && x.Password == password));

            //// return null if user not found
            //if (user == null)
            //    return null;

            //// authentication successful so return user details
            //return user;
        }
    }
}
