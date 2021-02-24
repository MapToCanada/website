import { API_CATEGORY } from "@admin/constant/apis.js";
import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "@admin/store/api.js";

const slice = createSlice({
  name: "category",
  initialState: {
    // status
    // In general scene, use combined status state
    loading: null,
    time: Date.now(),
    status: null,

    // entities
    categories: [],

    /* For specific usage */
    // Category Creating
    creating: null, // loading
    creatingStatus: null,
    createdCategory: null,
    showCreatingForm: false,

    // Category deleting
    deleting: null, // loading
    deletingStatus: null,

    // Editing
    currentId: null,
    startEditing: null, // loading current category
    currentValues: null, // current category fields data
    editing: null, // loading
    editingStatus: null,
    showEditingForm: false, // show editing modal
  },
  reducers: {
    // Category request started
    requested: (state) => {
      state.loading = true;
      state.status = "loading";
    }, // requested

    // Category request failed
    requestFailed: (state) => {
      state.loading = false;
      state.status = "error";
    }, // requestFailed

    // Fetch categories
    fetchCategoriesSucceed: (state, action) => {
      state.loading = false;
      state.status = "success";
      state.deleting = null;
      state.deletingStatus = null;
      state.creating = null; // loading
      state.creatingStatus = null;
      state.createdCategory = null;
      state.showCreatingForm = false;
      state.categories = action.payload;
    }, // authtokenRequestSucceed

    // Show Creating form modal
    startCreating: (state) => {
      state.creating = null; // loading
      state.creatingStatus = null;
      state.createdCategory = null;
      state.showCreatingForm = true;
    }, //showCreatingForm

    // Hide Creating form modal
    endCreating: (state) => {
      state.creating = null; // loading
      state.creatingStatus = null;
      state.createdCategory = null;
      state.showCreatingForm = false;
    }, //endCreating

    // createRequested
    createRequested: (state) => {
      state.creating = true;
    }, // createRequested

    createFailed: (state) => {
      state.creating = false;
      state.creatingStatus = "error";
      state.time = Date.now();
    }, //createFailed

    // Create category
    createSucceed: (state, action) => {
      state.creating = false;
      state.creatingStatus = "success";
      state.createdCategory = action.payload;
      state.time = Date.now();
    }, // createSucceed

    /* Delete a category */
    deleteRequested: (state) => {
      state.deleting = true;
    },

    deleteSuccessed: (state) => {
      state.deleting = false;
      state.deletingStatus = "success";
    },

    deleteFailed: (state) => {
      state.deleting = false;
      state.deletingStatus = "error";
    },

    /* edit a category */
    // Open editing modal and set currentId
    edit: (state, action) => {
      state.showEditingForm = true;
      state.currentId = action.payload;
    },

    // Request current values
    startEditing: (state) => {
      state.startEditing = true;
    },

    // Close editing modal and reset states
    endEditing: (state) => {
      state.currentId = null;
      state.startEditing = null;
      state.currentValues = null;
      state.editing = null;
      state.editingStatus = null;
      state.showEditingForm = false;
    },

    // Recived current values
    editingStarted: (state, action) => {
      state.startEditing = false; // end loading
      state.currentValues = action.payload;
    },

    // Start request the editing api 
    editRequested: (state) => {
      state.editing = true;
    },

    editFailed: (state) => {
      state.editing = false;
      state.editingStatus = "error";
    },

    editSuccessed: (state) => {
      state.editing = false;
      state.editingStatus = "success";
    },
  }, //reducers
}); //createSlice

export const {
  requested,
  requestFailed,
  fetchCategoriesSucceed,

  startCreating,
  endCreating,
  createRequested,
  createFailed,
  createSucceed,

  deleteRequested,
  deleteSuccessed,
  deleteFailed,

  edit,
  editRequested,
  editFailed,
  editSuccessed,
  startEditing,
  endEditing,
  editingStarted,
} = slice.actions;

export default slice.reducer;

export const fetchCategories = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: API_CATEGORY,
      method: "GET",
      params: data,
      onStart: requested.type,
      onSuccess: fetchCategoriesSucceed.type,
      onError: requestFailed.type,
    })
  );
};

export const createCategory = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: API_CATEGORY,
      method: "POST",
      data: data,
      onStart: createRequested.type,
      onSuccess: createSucceed.type,
      onError: createFailed.type,
    })
  );
};

export const deleteCategory = (id) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: API_CATEGORY + id + "/",
      method: "DELETE",
      onStart: deleteRequested.type,
      onSuccess: deleteSuccessed.type,
      onError: deleteFailed.type,
    })
  );
}

export const getCategory = (id) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: API_CATEGORY + id + "/",
      method: "GET",
      onStart: startEditing.type,
      onSuccess: editingStarted.type,
      onError: editFailed.type,
    })
  );
}

export const updateCategory = (id, data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: API_CATEGORY + id + "/",
      data: data,
      method: "PUT",
      onStart: editRequested.type,
      onSuccess: editSuccessed.type,
      onError: editFailed.type,
    })
  );
}

