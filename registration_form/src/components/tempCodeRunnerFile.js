 <div className="form-group">
            <i className="fa fa-city"></i>
            <input 
              type="text" 
              id="city" 
              name="city" 
              placeholder=" " 
              value={formValues.city}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="city">City</label>
          </div>