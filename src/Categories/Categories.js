import "./categories.css";
import category1 from "./../Media/category-1.jpg";
import category2 from "./../Media/category-2.jpg";
import category3 from "./../Media/category-3.jpg";
import category4 from "./../Media/category-4.jpg";
import { Link } from "react-router-dom";

function Categories() {
  return (
    <div className="Categories">
      <div className="landing-page-container categories">
        <div className="landing-page-content categories">
          <Link to="/books/thrillers">
            <div id="thriller-category" className="category-card">
              <img src={category1} alt="" />
              <p>Thriller</p>
            </div>
          </Link>
          <Link to="/books/drama">
            <div id="drama-category" className="category-card">
              <img src={category2} alt="" />
              <p>Drama</p>
            </div>
          </Link>
          <Link to="/books/sci-fi">
            <div id="scifi-category" className="category-card">
              <img src={category3} alt="" />
              <p>Sci-Fi</p>
            </div>
          </Link>
          <Link to="/books/romance">
            <div id="romance-category" className="category-card">
              <img src={category4} alt="" />
              <p>Romance</p>
            </div>
          </Link>
        </div>
        <Link to="/books">
          <button>Browse All Categories</button>
        </Link>
      </div>
    </div>
  );
}

export default Categories;
