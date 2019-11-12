using AngApi.DAL.Model;
using AngApi.DAL.UnitOfWork;
using AngApi.DAL.ViewModel;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace AngApi.BLL
{
    public interface IItemDetail
    {
        ItemDetailViewModel UpsertItemDetail(ItemDetailViewModel itemDetailVM);
        IEnumerable<ItemDetail> GetItemDetails();
        bool DeleteItemDetail(long itemDetailId);
        ItemDetail GetItemDetail(long Id);
    }
    public class BLItemDetail : IItemDetail
    {
        private readonly IUnitOfWork _uow;

        public BLItemDetail(IUnitOfWork uow)
        {
            this._uow = uow;
        }
        public bool DeleteItemDetail(long itemDetailId)
        {
            _uow.ItemDetailViewModel.DeleteItemDetail(itemDetailId);
            _uow.Complete();
            return true;
        }

        public ItemDetail GetItemDetail(long Id)
        {
            if (Id <= default(long))
                throw new ArgumentException("Invalid id");

            return _uow.ItemDetailViewModel.GetItemDetail(Id);
        }

        public IEnumerable<ItemDetail> GetItemDetails()
        {
            // We may implement validation like checking user roles
            return _uow.ItemDetailViewModel.GetItemDetails();
        }

        public ItemDetailViewModel UpsertItemDetail(ItemDetailViewModel itemDetailVM)
        {
            if (itemDetailVM == null)
                throw new ArgumentException("Invalid itemDetail");

            if (string.IsNullOrWhiteSpace(itemDetailVM.Name))
                throw new ArgumentException("Invalid itemDetail name");

            var _itemDetail = _uow.ItemDetailViewModel.GetItemDetail(itemDetailVM.Id);
            if (_itemDetail == null)
            {
                _itemDetail = new ItemDetail
                {
                    Name = itemDetailVM.Name,
                   // Photo = itemDetailVM.PhotoFile.FileName,
                    Photo = itemDetailVM.Photo,
                    Price = itemDetailVM.Price
                };
                _uow.ItemDetailViewModel.AddItemDetail(_itemDetail);
            }
            else
            {
                _itemDetail.Name = itemDetailVM.Name;
                _itemDetail.Photo = itemDetailVM.Photo;
                _itemDetail.Price = itemDetailVM.Price;
            }

            _uow.Complete();

            return itemDetailVM;
        }
    }
}
