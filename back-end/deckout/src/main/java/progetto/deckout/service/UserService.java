package progetto.deckout.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import progetto.deckout.entities.Card;
import progetto.deckout.entities.User;
import progetto.deckout.repository.CardRepository;
import progetto.deckout.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CardRepository cardRepository;

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

    public void addCardToUser(Long userId, Long cardId) {
        Optional<User> userOpt = getUserById(userId);
        Optional<Card> cardOpt = cardRepository.findById(cardId);
        if (userOpt.isPresent() && cardOpt.isPresent()) {
            User user = userOpt.get();
            Card card = cardOpt.get();
            user.getCards().add(card);
            userRepository.save(user);
            System.out.println("Added card " + cardId + " to user " + userId);
        } else {
            System.out.println("User or Card not found: userId=" + userId + ", cardId=" + cardId);
        }
    }

    public void removeCardFromUser(Long userId, Long cardId) {
        Optional<User> userOpt = getUserById(userId);
        Optional<Card> cardOpt = cardRepository.findById(cardId);
        if (userOpt.isPresent() && cardOpt.isPresent()) {
            User user = userOpt.get();
            Card card = cardOpt.get();
            user.getCards().remove(card);
            userRepository.save(user);
            System.out.println("Removed card " + cardId + " from user " + userId);
        } else {
            System.out.println("User or Card not found: userId=" + userId + ", cardId=" + cardId);
        }
    }

    public void addCardsToUserCollection(Long userId, List<Long> cardIds) {
        Optional<User> userOpt = getUserById(userId);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            for (Long cardId : cardIds) {
                Optional<Card> cardOpt = cardRepository.findById(cardId);
                cardOpt.ifPresent(user.getCards()::add);
            }
            userRepository.save(user);
            System.out.println("Added cards " + cardIds + " to user " + userId);
        } else {
            System.out.println("User not found with ID: " + userId);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("Loading user by username: " + username);
        Optional<User> user = getUserByUsername(username);
        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return user.get();
    }
}
