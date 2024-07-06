package progetto.deckout.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import progetto.deckout.entities.User;
import progetto.deckout.repository.UserRepository;

import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println("Registering user: " + user.getUsername());
        userRepository.save(user);
    }

    public Optional<User> getUserById(Long id) {
        System.out.println("Fetching user by ID: " + id);
        return userRepository.findById(id);
    }

    public Optional<User> getUserByUsername(String username) {
        System.out.println("Fetching user by username: " + username);
        return Optional.ofNullable(userRepository.findByUsername(username));
    }


    public boolean checkPassword(String rawPassword, String encodedPassword) {
        boolean matches = passwordEncoder.matches(rawPassword, encodedPassword);
        System.out.println("Password check: rawPassword=" + rawPassword + ", encodedPassword=" + encodedPassword + ", matches=" + matches);
        return matches;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("Loading user by username: " + username);
        Optional<User> user = getUserByUsername(username);
        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return (UserDetails) user.get();
}
}
