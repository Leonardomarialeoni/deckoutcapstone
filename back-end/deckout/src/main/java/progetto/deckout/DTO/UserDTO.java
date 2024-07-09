package progetto.deckout.DTO;

import progetto.deckout.entities.Card;
import progetto.deckout.entities.User;

import java.util.List;

public class UserDTO {

    private Long id;
    private String username;
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private List<Card> cards;

    public UserDTO() {
    }

    public UserDTO(Long id, String username, String password, String email, String firstName, String lastName, List<Card> cards) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.cards = cards;
    }

    // Getters and setters
    // ...

    public User toEntities() {
        User user = new User();
        user.setId(this.id);
        user.setUsername(this.username);
        user.setPassword(this.password);
        user.setEmail(this.email);
        user.setFirstName(this.firstName);
        user.setLastName(this.lastName);
        user.setCards(this.cards);
        return user;
    }

    public static UserDTO fromEntity(User user) {
        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getPassword(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getCards()
        );
    }
}
