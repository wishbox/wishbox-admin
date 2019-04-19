export const createEditProductForm = (catalogId, categories) => ({
  fields: {
    imageUrl: {
      id: 'imageUrl',
      type: 'text',
      label: 'Image Url'
    },
    name: {
      id: 'name',
      type: 'text',
      label: 'Name',
      required: true
    },
    description: {
      id: 'description',
      type: 'text',
      label: 'Description'
    },
    categoryIds: {
      id: 'categoryIds',
      type: 'multiselect',
      label: 'Category',
      options: categories
    },
    price: {
      id: 'price',
      type: 'number',
      label: 'Price',
      required: true
    },
    submit: {
      type: 'submit',
      label: 'Save'
    }
  },

  id: 'edit-product-form',
  className: 'edit-product-form',
  autoComplete: 'off',
  method: 'PUT',
  action: `/catalogs/${catalogId}/products`
})
