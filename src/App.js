import axios from "axios";
import React, { useState } from "react";

const App = () => {
  const [location, setLocation] = useState(null);
  const [animals, setAnimals] = useState([
    "bird",
    "cat",
    "dog",
    "reptile",
    "rabbit",
  ]);
  const [breed, setBreed] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [result, setResult] = useState([]);

  let animalHandler = async (e) => {
    setSelectedAnimal(e.target.value);
    let { data } = await axios.get(
      `http://pets-v2.dev-apis.com/pets?animal=${e.target.value}`
    );
    setBreed(data.pets); //setting breeds to show after animal is selected
  };

  let submitHandler = async (e) => {
    e.preventDefault();

    let { data } = await axios.get(
      `http://pets-v2.dev-apis.com/pets?animal=${selectedAnimal}&location=${location}&breed=${selectedBreed}`
    );
    setResult(data.pets); //setting all the results after form submission
  };
  return (
    <div className="container m-5">
      <form onSubmit={submitHandler} className="w-50">
        <input
          type="text"
          name="location"
          className="form-control"
          placeholder="location"
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        ></input>
        <select
          onChange={animalHandler}
          className="form-select mt-5"
          aria-label="Default select example"
        >
          <option defaultValue="">select a Animal</option>

          {animals &&
            animals.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
        </select>
        <select
          className="form-select mt-5"
          aria-label="Default select example"
          onChange={(e) => {
            setSelectedBreed(e.target.value);
          }}
        >
          <option defaultValue="">select a Breed</option>

          {breed &&
            breed.map((e, i) => (
              <option key={i} value={e.breed}>
                {e.breed}
              </option>
            ))}
        </select>
        <input type="submit" className="btn btn-primary mt-4"></input>
      </form>

      {result.length !== 0 ? (
        result.map((e, i) => (
          <div key={i} className="card mt-5" style={{ width: "18rem" }}>
            <img src={e.images[0]} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{e.animal}</h5>
              <p className="card-text">{e.breed}</p>
              <p className="card-text">
                {e.state},{e.city}
              </p>

              <p className="card-text">Name : {e.name}</p>
            </div>
          </div>
        ))
      ) : (
        <h5 className="mt-3">Sorry ! no pets to show</h5>
      )}
    </div>
  );
};

export default App;
