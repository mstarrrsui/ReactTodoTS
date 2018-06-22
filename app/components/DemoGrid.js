import React from "react";

import {
  Grid,
  GridColumn as Column,
  GridCellProps,
  GridCell,
  GridToolbar,
  GridDetailRow
} from "@progress/kendo-react-grid";

import { filterBy } from "@progress/kendo-data-query";
import log from 'loglevel';
import FormApi from '../api/mockFormApi';

const CustomCell = ({dataItem, field}) => {
  (
    <td>
      <input
        disabled
        type="checkbox"
        checked={dataItem[field]}
      />
    </td>
  );
}



class DemoGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      filter: null
    };
    this.filterChange = this.filterChange.bind(this);
    this.selectionChange = this.selectionChange.bind(this);

    this.loadData();
  }

  filterChange(event) {
    const filter = event.filter;
    // this.setState(() => ({
    //   data: this.GetProducts(filter),
    //   filter
    // }));
  }

  selectionChange(event, date, col) {
    event.dataItem.selected = !event.dataItem.selected;
    this.forceUpdate();
  }



  loadData() {
    log.info("Loading..");
    FormApi.getAllForms().then( data => {
      log.info("Data loaded");
      this.setState({data: data})
    });
  }

  render() {

    const { data, filter } = this.state;

    return (
      <div>
        <Grid
          data={ data }
          filterable={ true }
          filter={ filter }
          filterChange={ this.filterChange }
          selectedField="selected"
          selectionChange={ this.selectionChange }
          style={{ maxHeight: "720px", minHeight: "400px" }}>
            <Column field="selected" width="50px" />
            <Column field="NumberPlus" title="Doc Number" />
            <Column field="Name" title="Doc Name" />
        </Grid>
      </div>
    );
  }
}

module.exports = DemoGrid;
