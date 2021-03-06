import React, { useEffect, useReducer } from "react";
import omit from "lodash/omit";

import { POSITION_OPTIONS, STATUS_OPTIONS } from "../constants";

import "./FilterSection.scss";

const reducer = (state, action) => {
  const { field, value } = action;
  // removes empty values
  if (value === "") {
    return omit(state, [field]);
  }
  return { ...state, [field]: value };
};

const FilterSection = ({ initialFilters, onSubmit }) => {
  const [filters, dispatch] = useReducer(reducer, initialFilters);

  useEffect(() => {
    initialFilters.forEach((filter) => dispatch(filter));
  }, [initialFilters]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    dispatch({ field: name, value });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    onSubmit(filters);
  };

  const handleSelect = (e) => {
    const { name, value } = e.target;
    dispatch({ field: name, value });
  };

  const statusFilter = (
    <select
      id="inputStatus"
      name="status"
      value={filters.status?filters.status:''}
      className="form-select"
      onChange={handleSelect}
	  data-testid="filterInput"
    >
      {STATUS_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );

  const positionFilter = (
    <select
      id="inputPosition"
      name="positionApplied"
      value={filters.positionApplied?filters.positionApplied:''}
      className="form-select"
      onChange={handleSelect}
	  data-testid="filterInput"
    >
      {POSITION_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );

  return (
    <div className="filters">
      <form onSubmit={handleOnSubmit}>
        <div className="row align-items-end">
          <div className="col col-3 filters_filter">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputName"
              name="name"
			  data-testid="filterInput"
              value={filters.name?filters.name:''}
              onChange={handleOnChange}
            ></input>
          </div>
          <div className="col col-3 filters_filter">
            <label htmlFor="inputStatus" className="form-label">
              Status
            </label>
            {statusFilter}
          </div>
		  <div className="col col-3 filters_filter">
            <label htmlFor="inputPosition" className="form-label">
              Position Applied
            </label>
            {positionFilter}
          </div>
          <div className="col-3 text-end">
            <button type="submit" className="btn btn-primary filters__button" data-testid="filterButton">
              Filter
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FilterSection;
