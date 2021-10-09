import * as React from "react";
import { useForm } from "react-hook-form";
import styles from '../AddItem.module.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default function Form(){

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  return (
    <div className={styles.formContainer}>
      <form >
        <div className={styles.formRow}>
          <TextField className={styles.formName} fullWidth label="Nome" />
        </div>
        <div className={styles.formRow}>
          <TextField className={styles.formItem} label="Matricula" />
          <TextField className={styles.formItem} label="Departamento" />
          <TextField className={styles.formItem} label="Cargo" />
        </div>
        <div className={styles.formRow}>
          <TextField
              id="date"
              label="Dt. Nascimento"
              type="date"
              defaultValue="aaaa-mm-dd"
              className={styles.formDt}
              InputLabelProps={{
                shrink: true,
              }}
            />
        </div>
        <div className={styles.formRow}>
          <Button variant="contained" color="secondary">
            Adicionar
          </Button>
        </div>
      </form>
    </div>
  );
}
