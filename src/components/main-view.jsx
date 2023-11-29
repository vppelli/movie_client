import { useState } from "react";
import { MovieCard } from "./movie-card";
import { MovieView } from "./movie-view";

export const MainView = () => {
    const [movies, setMoviess] = useState([
        {
            id: 1,
            title: "Saving Private Ryan",
            image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRQ89HMuHlCxJwu68S3e0JQLtY3o_uc2woCAF8Vbq3Y3JzWJMto",
            genre: "Action, Adventure",
            director: "Steven Spielberg",
            released: "July 24, 1998",
            description: 
                "Captain John Miller (Tom Hanks) takes his men behind enemy lines to find Private James Ryan, whose three brothers have been killed in combat. Surrounded by the brutal realties of war, while searching for Ryan, each man embarks upon a personal journey and discovers their own strength to triumph over an uncertain future with honor, decency and courage."
        },
        {
            id: 2,
            title: "Alien",
            image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTgS4EaCIATEXUnDBg-FkJui_Tkjh1YiS_zhWvOpcGostwp9SQp",
            genre: "Sci-fi, Horror",
            director: "Ridley Scott",
            released: "May 25, 1979",
            description: 
                "In deep space, the crew of the commercial starship Nostromo is awakened from their cryo-sleep capsules halfway through their journey home to investigate a distress call from an alien vessel. The terror begins when the crew encounters a nest of eggs inside the alien ship. An organism from inside an egg leaps out and attaches itself to one of the crew, causing him to fall into a coma."
        },
        {
            id: 3,
            title: "Deadpool",
            image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQw1IlVEr7IFM65a3-3G_HZT5sCD48wjABqe0GeT4DqbjXNO8Lo",
            genre: "Action, Adventure",
            director: "Tim Miller",
            released: "February 12, 2016",
            description: 
                "Wade Wilson (Ryan Reynolds) is a former Special Forces operative who now works as a mercenary. His world comes crashing down when evil scientist Ajax (Ed Skrein) tortures, disfigures and transforms him into Deadpool. The rogue experiment leaves Deadpool with accelerated healing powers and a twisted sense of humor. With help from mutant allies Colossus and Negasonic Teenage Warhead (Brianna Hildebrand), Deadpool uses his new skills to hunt down the man who nearly destroyed his life."
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView movie = { selectedMovie } onBackClick = { () => setSelectedMovie(null) } />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            { movies.map((movie) => (
                <MovieCard
                    key = { movie.id }
                    movie = { movie }
                    onMovieClick = { (newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};