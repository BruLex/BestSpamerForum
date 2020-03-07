package app;

import app.domain.Sessionidstorage;
import app.domain.Users;
import app.repository.SessionidStorageRepository;
import app.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@RestController
public class AuthController {
    static class SessionID {
        String sessionID;
        SessionID(String sessionId) {
            this.sessionID = sessionId;
        }
        public String getSession_id() {
            return sessionID;
        }
    }

    static class LoginBody {
        @NotNull
        @NotBlank
        private String login;
        @NotNull
        @NotBlank
        private String password;
        public String getLogin() {
            return login;
        }
        public void setLogin(String login) {
            this.login = login;
        }
        public String getPassword() {
            return password;
        }
        public void setPassword(String password) {
            this.password = password;
        }
    }

    @Autowired
    UsersRepository usersRepository;
    @Autowired
    SessionidStorageRepository sessionidStorageRepository;

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public Response loginGET(
            @RequestParam(value = "login") String login,
            @RequestParam(value = "password") String password
    ) {
        return this.login(login, password);
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public Response loginPOST(@RequestBody @Valid LoginBody body) {
        return this.login(body.login, body.password);
    }

    public Response login(String login, String password) {
        List<Users> users = usersRepository.findByName(login);
        if (users.size() == 0) {
            return new Response<String>(false).setData("Not found");
        }
        Users targetUser = users.get(0);

        if (!targetUser.checkPassword(password)) {
            return new Response<String>(false).setData("Wrong login or password");

        }

        String sessionId = UUID.randomUUID().toString();
        sessionidStorageRepository.save(new Sessionidstorage(sessionId, targetUser.getI_user()));
        return new Response<SessionID>(true).setData(new SessionID(sessionId));
    }

    @RequestMapping("/logout")
    public Response logout(@RequestHeader(value = "SID") String sessionId) {
        List<Sessionidstorage> sessionids = sessionidStorageRepository.findBySessionId(sessionId);
        if (sessionids.size() == 0) {
            return new Response<String>(false).setData("Not found");
        }
        sessionidStorageRepository.save(sessionids.get(0).setActive(0));
        return new Response<>(true).setData(null);
    }

    @RequestMapping("/create_user")
    public Response createUser(@RequestBody @Valid LoginBody body) {
        Users newUser = new Users();
        newUser.setName(body.login);
        newUser.setPassword(body.password);
        usersRepository.save(newUser);
        return new Response<>(true).setData(null);
    }

    @RequestMapping("/ping")
    public Response ping(@RequestHeader(value = "SID") String sessionId) {
        List<Sessionidstorage> sessionidstorages = sessionidStorageRepository.findBySessionId(sessionId);
        if (sessionidstorages.size() == 0 || sessionidstorages.get(0).getActive() == 0) {
            return new Response<>(false).setData(null);
        }
        return new Response<>(true).setData(null);
    }
    @RequestMapping("/users")
    public List<Users> getAllUsers() {
        return new ArrayList<Users>((Collection<? extends Users>) usersRepository.findAll());
    }

    @RequestMapping("/whoami")
    public Response getUser(@RequestHeader(value = "SID") String sessionId) {
        Users user = AuthController.checkSID(sessionId, usersRepository, sessionidStorageRepository);
        return new Response<Users>(user != null).setData(user);
    }
    static Users checkSID(
            String SID,
            UsersRepository usersRepository,
            SessionidStorageRepository sessionidStorageRepository
    ) {
        List<Sessionidstorage> sessionidstorages = sessionidStorageRepository.findBySessionId(SID);
        if (sessionidstorages.size() == 0 || sessionidstorages.get(0).getActive() == 0) {
            return null;
        }
        return usersRepository.findById(sessionidstorages.get(0).getIUser()).get();
    }

}
