import * as React from 'react';
import styles from './AddItem.module.scss';
import { IAddItemProps } from './IAddItemProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export interface IColaboradores{
  listItems: any;
}

export default class AddItem extends React.Component<IAddItemProps, IColaboradores,{}> {



  constructor(props){
    super(props);
    this.state = {
      listItems: []
    }
  }
  async componentDidMount(){
    const items: any[] = await sp.web.lists.getByTitle("Colaboradores").items.get();
    console.log(items);

    this.setState({
      listItems: items
    })

  }

  renderTable(value){
    return (
      <th>
        <td>{value.Title}</td>
        <td>{value.Cargo}</td>
      </th>
    )
  }

  renderMatTable(value){
    return (
      <th>
        <td>{value.Title}</td>
        <td>{value.Cargo}</td>
      </th>
    )
  }

  public render(): React.ReactElement<IAddItemProps> {
    return (
      <div className={ styles.addItem }>
        <div className={ styles.container }>
        <TableContainer component={Paper}>
            <Table className={styles.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell align="center">Matricula</TableCell>
                  <TableCell align="center">Departamento</TableCell>
                  <TableCell align="center">Cargo</TableCell>
                  <TableCell align="center">#</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.listItems.map((row) => (
                  <TableRow key={row.Title}>
                    <TableCell component="th" scope="row">
                      {row.Title}
                    </TableCell>
                    <TableCell align="center">{row.Matricula}</TableCell>
                    <TableCell align="center">{row.Departamento}</TableCell>
                    <TableCell align="center">{row.Cargo}</TableCell>
                    <TableCell align="center">
                      <IconButton aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}
