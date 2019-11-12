using AngApi.DAL.Model;
using AngApi.DAL.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AngApi.DAL.Repositories
{
    public interface IItemDetailRepository
    {
        void AddItemDetail(ItemDetail itemDetailVM);
        IEnumerable<ItemDetail> GetItemDetails();
        bool DeleteItemDetail(long itemDetailId);
        ItemDetail GetItemDetail(long Id);
    }
    public class ItemDetailRepository : IItemDetailRepository
    {
        private readonly AuthenticationContext _context;
        public ItemDetailRepository(AuthenticationContext context)
        {
            this._context = context;
        }
        public void AddItemDetail(ItemDetail itemDetail)
        {
            _context.ItemDetails.Add(itemDetail);
        }

        public bool DeleteItemDetail(long itemDetailId)
        {
            var removed = false;
            ItemDetail itemDetail = GetItemDetail(itemDetailId);

            if (itemDetail != null)
            {
                removed = true;
                _context.ItemDetails.Remove(itemDetail);
            }

            return removed;
        }

        public ItemDetail GetItemDetail(long Id)
        {
            return _context.ItemDetails.Where(u => u.Id == Id).FirstOrDefault();
        }

        public IEnumerable<ItemDetail> GetItemDetails()
        {
            return _context.ItemDetails;
        }
    }
}
