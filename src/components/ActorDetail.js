import React from "react";
import Master from "../layouts/Master.js";
import { Link, useParams } from "react-router-dom";
import tmdbApi from "../config/tmdbApi.js";
import dateFormat from "dateformat";
import "../css/master.css";

export default function ActorDetail() {
  let { id } = useParams();
  const [actor, setActor] = React.useState([]);
  const [credits, setCredits] = React.useState([]);

  React.useEffect(() => {
    let apiCall = true;
    if (apiCall) {
      const params = {};
      const getPersonDetail = async () => {
        try {
          const response = await tmdbApi.getPersonDetail(id, { params });
          const credits = await tmdbApi.getPersonCredits(id, { params });
          setActor(response);
          setCredits(credits.cast.slice(0, 4));
        } catch {
          console.log("error");
        }
      };
      getPersonDetail();
    }
    return () => {
      apiCall = false;
    };
  }, [id]);
  return (
    <Master>
      <div className="container">
        <div className="row p-3">
          <div className="col-md-4">
            <img
              src={`https://image.tmdb.org/t/p/w300_and_h450_face/${actor.profile_path}`}
              alt="poster"
              className="img-fluid"
            />
          </div>
          <div className="col-md-8">
            <h3 className="pb-2 pt-md-0 pt-2">{actor.name}</h3>
            <div className="pb-4">
              <span className="badge bg-light text-dark">
                Birthday : {dateFormat(actor.birthday, "dddd, mmmm dS, yyyy")}
              </span>
              <span className="badge bg-light text-dark">
                Popularity :{actor.popularity}
              </span>
              <span className="badge bg-light text-dark">
                Place Of Birth : {actor.place_of_birth}
              </span>
            </div>
            <p className="pb-2">{actor.biography}</p>
            <div className="row">
              <h3>Known For</h3>
              {credits.map((d) => {
                return (
                  <div className="col-3" key={d.id}>
                    {d.poster_path ? (
                      <Link to={"/movie/" + d.id}>
                        <img
                          src={`https://image.tmdb.org/t/p/original/${d.poster_path}`}
                          alt="poster"
                          className="img-fluid mb-2"
                        />
                      </Link>
                    ) : (
                      <img
                        src={`https://via.placeholder.com/400x600/000000/?text=${d.title}`}
                        alt="poster"
                        className="img-fluid mb-2"
                      />
                    )}
                    <span className="h-movie-detail">{d.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Master>
  );
}
