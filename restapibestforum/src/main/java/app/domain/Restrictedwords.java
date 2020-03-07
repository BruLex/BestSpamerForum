package app.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Restrictedwords {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long iWord;
    private String word;


    public long getI_Word() {
        return iWord;
    }

    public void setIWord(long iWord) {
        this.iWord = iWord;
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }
}
