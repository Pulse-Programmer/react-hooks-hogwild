import { useState } from "react";

function Dashboard({ hogs }) {
  const [clickedHog, setClickedHog] = useState(null);
  const [greased, setGreased] = useState("All");
  const [sorted, setSorted] = useState(null);
  const [hide, setHide] = useState(null);

  function handleFilter(e) {
    setGreased(e.target.value);
  }

  function handleClick(hogname) {
    setClickedHog(clickedHog === hogname ? null : hogname);
  }

  function handleSort(e) {
    if (e.target.name === "sortName") {
      hogs.sort((a, b) => a.name.localeCompare(b.name));
      setSorted("Name");
    } else {
      hogs.sort((a, b) => a.weight - b.weight);
      setSorted("Weight");
    }
  }

  function handleHide(hogname) {
    setHide(hide === hogname ? null : hogname);
  }

  const filteredHogs = hogs.filter((hog) => {
    if (greased === "All") {
      return true;
    } else if (greased === "Greased") {
      return hog.greased;
    } else {
      return !hog.greased;
    }
  });

  const hogsData = filteredHogs.map((hog) => {
    return (
      <>
        {hide === hog.name || (
          <div key={hog.name} className="ui grid container">
            <div
              onClick={() => handleClick(hog.name)}
              className="ui eight wide column"
            >
              <p>{hog.name}</p>
              <img
                src={hog.image}
                alt={hog.name}
                style={{ width: "150px", height: "150px", borderRadius: "50%" }}
              />
            </div>
            {clickedHog === hog.name && (
              <p className="ui eight wide column">
                Specialty: {hog.specialty} || Weight: {hog.weight} || Greased:{" "}
                {hog.greased} || Highest Medal: {hog["highest medal achieved"]}
              </p>
            )}
            <button onClick={() => handleHide(hog.name)}>Hide</button>
          </div>
        )}
      </>
    );
  });

  return (
    <>
      <select name="Greased" onChange={handleFilter}>
        <option value="All">All</option>
        <option value="Greased">Greased</option>
        <option value="Not Greased">Not Greased</option>
      </select>
      <button type="button" name="sortName" onClick={handleSort}>
        Sort by name
      </button>
      <button type="button" name="sortWeight" onClick={handleSort}>
        Sort by weight
      </button>

      {hogsData}
    </>
  );
}

export default Dashboard;
