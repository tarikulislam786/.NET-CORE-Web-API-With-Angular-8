using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace AngApi.DAL.ViewModel
{
    public class ItemDetailViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Photo { get; set; }
       
        public IFormFile PhotoFile { get; set; }
        public decimal Price { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
    }
}
