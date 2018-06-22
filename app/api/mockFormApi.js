import delay from './delay';
import forms from "../data/property_forms.json";




const MemberApi = {

  formData: [],


  getAllForms: function() {

    const isNull = (data) => (data == null || data === 'NULL') ? true : false;

    const createFullDocNumber = (doc) =>
      `${isNull(doc.DocNumber) ? '' : doc.DocNumber} ${isNull(doc.Edition) ? '' : doc.Edition}`

    if (this.formData.length < 1)
      this.formData = forms.map( d => ({ NumberPlus: createFullDocNumber(d), selected: false, ...d}));

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], this.formData.slice(0,500)));
      }, delay);
    });
  }


}

export default MemberApi;
