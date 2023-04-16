import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { thunkEditSpot } from "../../store/spotsReducer";
import "./EditSpot.css";

export default function EditSpot() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { spotId } = useParams();

  const spotData = useSelector((state) => {
    return state.spots.allSpots[spotId];
  });

  const [country, setCountry] = useState(spotData.country);
  const [address, setAddress] = useState(spotData.address);
  const [city, setCity] = useState(spotData.city);
  const [state, setState] = useState(spotData.state);
  const [description, setDescription] = useState(spotData.description);
  const [name, setName] = useState(spotData.name);
  const [price, setPrice] = useState(spotData.price);
  const [validationErrors, setValidationErrors] = useState({});
  const [errors, setErrors] = useState([]);

  const validate = () => {
    const errors = {};

    if (!country) errors.Country = "Country is required";

    if (!address) errors.Address = "Address is required";

    if (!city) errors.City = "City is required";

    if (!state) errors.State = "State is required";

    if (description.length < 30) {
      errors.Description = "Description needs a minimum of 30 characters";
    }

    if (!name) errors.Name = "Name is required";

    if (!price) errors.Price = "Price is required";

    return errors;
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    const errorContent = Object.values(errors);
    if (errorContent.length) return setValidationErrors(errors);

    const formInfo = {
      country,
      address,
      city,
      state,
      description,
      name,
      price,
    };

    await dispatch(thunkEditSpot(formInfo, spotId)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });

    history.push(`/spots/${spotId}`);

    setCountry("");
    setAddress("");
    setCity("");
    setState("");
    setDescription("");
    setName("");
    setPrice("");
    setValidationErrors([]);
    setErrors([]);
  };

  return (
    <div className="form">
      <div className="form-inner">
        <h2>Update your Spot</h2>
        <form onSubmit={onSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="form-row">
            <label>Country</label>
            <input
              id="country"
              type="text"
              onChange={(e) => setCountry(e.target.value)}
              value={country}
              placeholder="Country"
            />
            {validationErrors.Country && (
              <div className="error-msg">* {validationErrors.Country}</div>
            )}
          </div>
          <div className="form-row">
            <label>Street Address</label>
            <input
              id="address"
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              placeholder="Address"
            />
            {validationErrors.Address && (
              <div className="error-msg">* {validationErrors.Address}</div>
            )}
          </div>
          <div className="city-state">
            <div className="form-row">
              <label>City</label>
              <input
                id="city"
                type="text"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                placeholder="City"
              />
              {validationErrors.City && (
                <div className="error-msg">* {validationErrors.City}</div>
              )}
            </div>
            <div className="form-row">
              <label>State</label>
              <input
                id="state"
                type="text"
                onChange={(e) => setState(e.target.value)}
                value={state}
                placeholder="STATE"
              />
              {validationErrors.State && (
                <div className="error-msg">* {validationErrors.State}</div>
              )}
            </div>
          </div>
          <div className="form-row">
            <label>Describe your place to guests</label>
            <input
              id="description"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Description"
            />
            {validationErrors.Description && (
              <div className="error-msg">* {validationErrors.Description}</div>
            )}
          </div>
          <div className="form-row">
            <label>Create a title for your spot</label>
            <input
              id="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Name of your spot"
            />
            {validationErrors.Name && (
              <div className="error-msg">* {validationErrors.Name}</div>
            )}
          </div>
          <div className="form-row">
            <label>Set a base price for your spot</label>
            <input
              id="price"
              type="text"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              placeholder="Price per night (USD)"
            />
            {validationErrors.Price && (
              <div className="error-msg">* {validationErrors.Price}</div>
            )}
          </div>
          <div className="submit-button">
            <button style={{ backgroundColor: "red", color: "white" }} className="submit-btn">
              Update Spot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
