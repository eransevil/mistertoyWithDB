import { toyService } from '../services/toy.service.js';
import {reviewService} from '../services/review.service.js'

export const toyStore = {
  state: {
    toys: [],
    filterBy: {
      name: '',
      inStock: true,
      type: 'all',
    },
    pageIdx: 1,
  }, 
  getters: {
    toysForDisplay(state) {
      if (state.pageIdx === 1) return state.toys.slice(0, state.pageIdx * 5);
      return state.toys.slice((state.pageIdx - 1) * 5, state.pageIdx * 5);
    },
    sumType(state) { 
      return  state.toys.reduce((acc, toy) => {
        if (!acc[toy.type]) acc[toy.type] = 0;
         acc[toy.type]++;
        return acc;
      }, {});
    
    },

    typeMap(state) {
      return state.toys.reduce((acc, toy) => {
        if (!acc[toy.type]) acc[toy.type] =parseInt(toy.price)
         acc[toy.type] += parseInt(toy.price);
        return acc;
      }, {});
    },
    // massages(state){
    //   return state.toy
    // }

  },
 
  mutations: {
    setPage(state, { pageIdx }) {
      state.pageIdx = pageIdx;
    },

    setToys(state, { toys }) {
      state.toys = toys;
    },
    updateToy(state, { toy }) {
      const idx = state.toys.findIndex(({ _id }) => _id === toy._id);
      state.toys.splice(idx, 1, toy);
    },

    removeToy(state, { toyId }) {
      const idx = state.toys.findIndex((toy) => toy._id === toyId);
      state.toys.splice(idx, 1);
    },
    filterToy(state, { filterBy }) {
      state.filterBy = filterBy;
    },
    addToy(state, { toy }) {
      state.toys.push(toy);
    },
  },
  actions: {
    loadToys({ commit, state }) {
      return toyService
        .query(state.filterBy)
        .then((toys) => {
          commit({
            type: 'setToys',
            toys,
          });
        })
        .catch((err) => {
          console.log('from Store: Cannot load toys', err);
          throw new Error('Cannot load toys');
        });
    },
    removeToy({ commit }, { toyId }) {
      return toyService
        .remove(toyId)
        .then(() => {
          commit({
            type: 'removeToy',
            toyId,
          });
        })
        .catch((err) => {
          console.log('Store: Cannot delete toy', err);
          // throw new Error('Cannot delete toy');
        });
    },
    addToy({ commit }, { toy }) {
      const type = toy._id ? 'updateToy' : 'addToy';
      toyService
        .save(toy)
        .then((savedToy) => {
          commit({
            type,
            toy: savedToy,
          });
        })
        .catch((err) => {
          console.log('Store: Cannot add toy', err);
          throw new Error('Cannot save toy');
        });
    },


  },
};
