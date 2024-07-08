package progetto.deckout.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.lang.reflect.Array;
import java.util.Collection;
import java.util.List;

    @Entity
    @Data
    @Table(name = "\"user\"")
    public class User implements UserDetails {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @NotBlank
        private String username;

        @NotBlank
        private String password;

        @Email
        private String email;

        private String firstName;
        private String lastName;


        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return List.of();
        }
    }

