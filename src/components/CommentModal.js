import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { addComment } from '../store/slices/view'


import {
  closeCommentsModal,
  getViewCommentsModalOpen,
} from "store/slices/view";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    background: 'white',
    padding: '40px'
  },
  marginTop: {
    marginTop: '20px'
  }
}));

const validationSchema = yup.object({
  name: yup
    .string('Enter your name')
    .min(1,'Name should be of minimum 1 character length')
    .required('Name is required'),
  comment: yup
    .string('Enter your comment')
    .min(8, 'Comment should be of minimum 8 characters length')
    .required('Comment is required'),
});

const CommentModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isOpen = useSelector(getViewCommentsModalOpen);

  const handleClose = () => dispatch(closeCommentsModal());

  const formik = useFormik({
    initialValues: {
      name: '',
      comment: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values,actions) => {
      dispatch(addComment(values))
      handleClose()
      actions.resetForm()
    },
  });

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      className={classes.modal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.background}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="comment"
          name="comment"
          label="Comment"
          value={formik.values.comment}
          onChange={formik.handleChange}
          error={formik.touched.comment && Boolean(formik.errors.comment)}
          helperText={formik.touched.comment && formik.errors.comment}
        />
        <Button  className={classes.marginTop} color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
    </Modal>
  );
};

export default CommentModal;
