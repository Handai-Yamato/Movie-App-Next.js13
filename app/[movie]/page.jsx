import Image from "next/image";
import styles from "../scss/movie/page.module.scss";

export async function generateStaticParams() {
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}`
  );
  const res = await data.json();

  return res.results.map((movie) => ({
    movie: String(movie.id),
  }));
}

export default async function MovieDetail({ params }) {
  const { movie } = params;
  const imagePath = "https://image.tmdb.org/t/p/original/";
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.API_KEY}`,
    { next: { revalidate: 60 } }
  );
  const res = await data.json();

  return (
    <>
      <div>
        <h2>{res.title}</h2>
        <h2>{res.release_date}</h2>
        <h2>Runtime:{res.runtime} minutes</h2>
        <h2 className={styles.status}>{res.status}</h2>
        <div>
          <Image
            src={imagePath + res.backdrop_path}
            fill
            priority
            className={styles.image}
            alt="movieImage"
          />
        </div>
        <p className={styles.overview}>{res.overview}</p>
      </div>
    </>
  );
}
