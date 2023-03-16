import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkAddSpot } from "../../store/spotsReducer";
import { useHistory } from "react-router-dom";

export default function CreateSpot() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [photo2, setPhoto2] = useState("");
  const [photo3, setPhoto3] = useState("");
  const [photo4, setPhoto4] = useState("");
  const [photo5, setPhoto5] = useState("");
  const [errors, setErrors] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const formInfo = {
      country,
      address,
      city,
      state,
      description,
      name,
      price,
    };

    const imageInfo = [
      { url: previewImage, preview: true },
      { url: photo2, preview: false },
      { url: photo3, preview: false },
      { url: photo4, preview: false },
      { url: photo5, preview: false },
    ];

    let spotId = await dispatch(thunkAddSpot(formInfo, imageInfo)).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );

    history.push(`/spots/${spotId}`);

    setCountry("");
    setAddress("");
    setCity("");
    setState("");
    setDescription("");
    setName("");
    setPrice("");
    setPreviewImage("");
    setPhoto2("");
    setPhoto3("");
    setPhoto4("");
    setPhoto5("");
  };

  return (
    <div className="form">
      <h2>Create a new Spot</h2>
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
            // required
          />
        </div>
        <div className="form-row">
          <label>Street Address</label>
          <input
            id="address"
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            placeholder="Address"
            // required
          />
        </div>
        <div className="form-row">
          <label>City</label>
          <input
            id="city"
            type="text"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            placeholder="City"
            // required
          />
        </div>
        <div className="form-row">
          <label>State</label>
          <input
            id="state"
            type="text"
            onChange={(e) => setState(e.target.value)}
            value={state}
            placeholder="STATE"
            // required
          />
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
        </div>
        <div className="form-row">
          <label>Create a title for your spot</label>
          <input
            id="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Name of your spot"
            // required
          />
        </div>
        <div className="form-row">
          <label>Set a base price for your spot</label>
          <input
            id="price"
            type="text"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            placeholder="Price per night (USD)"
            // required
          />
        </div>
        <div className="form-row">
          <label>Liven up your spot with photos</label>
          <input
            id="previewImage"
            type="url"
            onChange={(e) => setPreviewImage(e.target.value)}
            value={previewImage}
            placeholder="Preview Image URL"
            // required
          />
          <input
            id="photo2"
            type="url"
            onChange={(e) => setPhoto2(e.target.value)}
            value={photo2}
            placeholder="Image URL"
          />
          <input
            id="photo3"
            type="url"
            onChange={(e) => setPhoto3(e.target.value)}
            value={photo3}
            placeholder="Image URL"
          />
          <input
            id="photo4"
            type="url"
            onChange={(e) => setPhoto4(e.target.value)}
            value={photo4}
            placeholder="Image URL"
          />
          <input
            id="photo5"
            type="url"
            onChange={(e) => setPhoto5(e.target.value)}
            value={photo5}
            placeholder="Image URL"
          />
        </div>
        <button>Create a Spot</button>
      </form>
    </div>
  );
}
