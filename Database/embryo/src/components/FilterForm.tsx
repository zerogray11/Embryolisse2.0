import React, { useState, FormEvent } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;  
  imageUrl: string;     
}

const FilterForm: React.FC = () => {
  // State to hold user selections
  const [skinType, setSkinType] = useState<string>('');
  const [breakout, setBreakout] = useState<string>('');
  const [concern, setConcern] = useState<string>('');
  const [targetArea, setTargetArea] = useState<string>('');
  const [forWinter, setForWinter] = useState<boolean | null>(null);
  const [forSun, setForSun] = useState<boolean | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  // Submit the form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch(
      `http://localhost:8080/api/products/filter?skinType=${skinType}&concern=${concern}&breakout=${breakout}&targetArea=${targetArea}&forWinter=${forWinter}&forSun=${forSun}`
    );

    if (response.ok) {
      const data: Product[] = await response.json();
      setProducts(data); // Set products
    } else {
      console.error("Error fetching products");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Skin Type */}
        <div>
          <label>How would you describe your skin type?</label>
          <div>
            <input
              type="radio"
              id="oily"
              name="skinType"
              value="Oily"
              onChange={(e) => setSkinType(e.target.value)}
            />
            <label htmlFor="oily">Oily</label>
            <input
              type="radio"
              id="dry"
              name="skinType"
              value="Dry"
              onChange={(e) => setSkinType(e.target.value)}
            />
            <label htmlFor="dry">Dry</label>
            <input
              type="radio"
              id="combination"
              name="skinType"
              value="Combination"
              onChange={(e) => setSkinType(e.target.value)}
            />
            <label htmlFor="combination">Combination</label>
            <input
              type="radio"
              id="normal"
              name="skinType"
              value="Normal"
              onChange={(e) => setSkinType(e.target.value)}
            />
            <label htmlFor="normal">Normal</label>
            <input
              type="radio"
              id="sensitive"
              name="skinType"
              value="Sensitive"
              onChange={(e) => setSkinType(e.target.value)}
            />
            <label htmlFor="sensitive">Sensitive</label>
          </div>
        </div>

        {/* Breakout Frequency */}
        <div>
          <label>How often do you experience breakouts?</label>
          <div>
            <input
              type="radio"
              id="never"
              name="breakout"
              value="Never"
              onChange={(e) => setBreakout(e.target.value)}
            />
            <label htmlFor="never">Never</label>
            <input
              type="radio"
              id="rarely"
              name="breakout"
              value="Rarely"
              onChange={(e) => setBreakout(e.target.value)}
            />
            <label htmlFor="rarely">Rarely</label>
            <input
              type="radio"
              id="sometimes"
              name="breakout"
              value="Sometimes"
              onChange={(e) => setBreakout(e.target.value)}
            />
            <label htmlFor="sometimes">Sometimes</label>
            <input
              type="radio"
              id="frequently"
              name="breakout"
              value="Frequently"
              onChange={(e) => setBreakout(e.target.value)}
            />
            <label htmlFor="frequently">Frequently</label>
          </div>
        </div>

        {/* Skin Concern */}
        <div>
          <label>What is your top skin concern?</label>
          <div>
            <input
              type="radio"
              id="acne"
              name="concern"
              value="Acne"
              onChange={(e) => setConcern(e.target.value)}
            />
            <label htmlFor="acne">Acne</label>
            <input
              type="radio"
              id="darkSpots"
              name="concern"
              value="Dark spots"
              onChange={(e) => setConcern(e.target.value)}
            />
            <label htmlFor="darkSpots">Dark spots</label>
            <input
              type="radio"
              id="redness"
              name="concern"
              value="Redness"
              onChange={(e) => setConcern(e.target.value)}
            />
            <label htmlFor="redness">Redness</label>
            <input
              type="radio"
              id="wrinkles"
              name="concern"
              value="Wrinkles"
              onChange={(e) => setConcern(e.target.value)}
            />
            <label htmlFor="wrinkles">Wrinkles</label>
            <input
              type="radio"
              id="fineLines"
              name="concern"
              value="Fine lines"
              onChange={(e) => setConcern(e.target.value)}
            />
            <label htmlFor="fineLines">Fine lines</label>
            <input
              type="radio"
              id="dryness"
              name="concern"
              value="Dryness"
              onChange={(e) => setConcern(e.target.value)}
            />
            <label htmlFor="dryness">Dryness</label>
            <input
              type="radio"
              id="oiliness"
              name="concern"
              value="Oiliness"
              onChange={(e) => setConcern(e.target.value)}
            />
            <label htmlFor="oiliness">Oiliness</label>
            <input
              type="radio"
              id="unevenTexture"
              name="concern"
              value="Uneven texture"
              onChange={(e) => setConcern(e.target.value)}
            />
            <label htmlFor="unevenTexture">Uneven texture</label>
          </div>
        </div>

        {/* Target Area */}
        <div>
          <label>What areas would you like to target with our products?</label>
          <div>
            <input
              type="radio"
              id="hands"
              name="targetArea"
              value="Hands"
              onChange={(e) => setTargetArea(e.target.value)}
            />
            <label htmlFor="hands">Hands</label>
            <input
              type="radio"
              id="body"
              name="targetArea"
              value="Body"
              onChange={(e) => setTargetArea(e.target.value)}
            />
            <label htmlFor="body">Body</label>
            <input
              type="radio"
              id="face"
              name="targetArea"
              value="Face"
              onChange={(e) => setTargetArea(e.target.value)}
            />
            <label htmlFor="face">Face</label>
            <input
              type="radio"
              id="lips"
              name="targetArea"
              value="Lips"
              onChange={(e) => setTargetArea(e.target.value)}
            />
            <label htmlFor="lips">Lips</label>
            <input
              type="radio"
              id="eyes"
              name="targetArea"
              value="Eyes"
              onChange={(e) => setTargetArea(e.target.value)}
            />
            <label htmlFor="eyes">Eyes</label>
          </div>
        </div>

        {/* Winter Dry Skin */}
        <div>
          <label>Do you experience drier skin in the winter?</label>
          <div>
            <input
              type="radio"
              id="yesWinter"
              name="forWinter"
              value="true"
              onChange={() => setForWinter(true)}
              checked={forWinter === true}
            />
            <label htmlFor="yesWinter">Yes</label>
            <input
              type="radio"
              id="noWinter"
              name="forWinter"
              value="false"
              onChange={() => setForWinter(false)}
              checked={forWinter === false}
            />
            <label htmlFor="noWinter">No</label>
          </div>
        </div>

        {/* Sun Exposure */}
        <div>
          <label>Do you spend a lot of time in the sun?</label>
          <div>
            <input
              type="radio"
              id="yesSun"
              name="forSun"
              value="true"
              onChange={() => setForSun(true)}
              checked={forSun === true}
            />
            <label htmlFor="yesSun">Yes</label>
            <input
              type="radio"
              id="noSun"
              name="forSun"
              value="false"
              onChange={() => setForSun(false)}
              checked={forSun === false}
            />
            <label htmlFor="noSun">No</label>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>

      {/* Display filtered products */}
      <div className="products-container">
        <h3>Filtered Products:</h3>
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <div className="product-details">
                <h4 className="product-name">{product.name}</h4>
                <p className="product-description">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterForm;
