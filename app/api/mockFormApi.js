import forms from '../data/propertyForms';

const delay = 3000;

const MemberApi = {
  formData: [],

  getAllForms() {
    const isNull = data => !!(data == null || data === 'NULL');

    const createFullDocNumber = doc =>
      // eslint-disable-next-line implicit-arrow-linebreak
      `${isNull(doc.DocNumber) ? '' : doc.DocNumber} ${isNull(doc.Edition) ? '' : doc.Edition}`;

    if (this.formData.length < 1) {
      this.formData = forms.map(d => ({
        NumberPlus: createFullDocNumber(d),
        selected: false,
        ...d
      }));
    }

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(Object.assign([], this.formData.slice(0, 500)));
      }, delay);
    });
  }
};

export default MemberApi;
