import React, { useState } from 'react';
import './photo.css';

function BidItem({ user, amount }) {
  return (
    <li>
      <strong>{user}:</strong> ${amount}
    </li>
  );
}

function BidForm({ onSubmit }) {
  const [userName, setUserName] = useState('');
  const [bidAmount, setBidAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if user name and bid amount are not empty
    if (!userName || !bidAmount) {
      alert('Please enter both your name and bid amount.');
      return;
    }
    // Call the onSubmit function with the user input values
    onSubmit({ user: userName, amount: bidAmount });
    // Reset input fields after submission
    setUserName('');
    setBidAmount('');
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Add a higher bid"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
      />
      <button type="submit">Submit Your Higher Bid</button>
    </form>
  );
}

function PhotoContainer({ imageUrl, bids, onBidSubmit }) {
  return (
    <div className="photo-container">
      <div className="photo">
        <img src={imageUrl} alt="" />
      </div>
      <div className="comments-section">
        <h4>Bids</h4>
        <ul>
          {bids.map((bid, index) => (
            <BidItem key={index} user={bid.user} amount={bid.amount} />
          ))}
        </ul>
      </div>
      <div className="addbid">
        <BidForm onSubmit={onBidSubmit} />
      </div>
    </div>
  );
}

function PhotoGallery() {
  const [photos, setPhotos] = useState([
    {
      imageUrl: "https://images.metmuseum.org/CRDImages/ep/original/DT1946.jpg",
      bids: [
        { user: "User1", amount: 100 }
      ]
    },
    {
      imageUrl: "https://images.metmuseum.org/CRDImages/ep/original/DT1946.jpg",
      bids: [
        { user: "User1", amount: 100 }
      ]
    }
  ]);

  const handleBidSubmit = (bid, photoIndex) => {
    // Find the highest bid in the current list of bids for the specified photo
    const highestBid = photos[photoIndex].bids.reduce((maxBid, currentBid) => {
      return currentBid.amount > maxBid ? currentBid.amount : maxBid;
    }, 0);

    // Check if the new bid is higher than the highest bid
    if (bid.amount > highestBid) {
      // Update the bids in the photos state
      setPhotos(prevPhotos => prevPhotos.map((photo, index) => {
        if (index === photoIndex) {
          return {
            ...photo,
            bids: [...photo.bids, bid]
          };
        }
        return photo;
      }));
    } else {
      // Display a message indicating that the bid is not higher
      alert('Your bid must be higher than the previous bid.');
    }
  };

  return (
    <div className="App">
      <div className="photo-gallery">
        {photos.map((photo, index) => (
          <PhotoContainer key={index} imageUrl={photo.imageUrl} bids={photo.bids} onBidSubmit={(bid) => handleBidSubmit(bid, index)} />
        ))}
      </div>
    </div>
  );
}

export default PhotoGallery;