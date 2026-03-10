import mongoose from 'mongoose';

class ApiFilters {
  model: any;

  constructor(model: any) {
    this.model = model;
  }

  search(query: string) {
    const searchById = {
      _id: query,
    };

    const searchByKeyword = {
      name: {
        $regex: query,
        $options: 'i',
      },
    };

    const searchQuery = query ? (mongoose.isValidObjectId(query) ? searchById : searchByKeyword) : {};
    this.model = this.model.find({ ...searchQuery });
    return this;
  }

  filters(filters: any | null) {
    if (!filters) return this;
    const filtersCopy = { ...filters };
    let filterString = JSON.stringify(filtersCopy);
    filterString = filterString.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    this.model = this.model.find(JSON.parse(filterString));
    return this;
  }

  pagination(page: string | number, resPerPage: number) {
    const currentPage = Number(page) || 1;
    this.model = this.model.limit(resPerPage).skip(resPerPage * (currentPage - 1));
    return this;
  }
}

export default ApiFilters;
