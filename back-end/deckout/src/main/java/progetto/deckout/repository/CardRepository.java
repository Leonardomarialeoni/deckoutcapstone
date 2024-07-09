package progetto.deckout.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import progetto.deckout.entities.Card;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {
}

