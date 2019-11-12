using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using AngApi.BLL;
using AngApi.DAL.Model;
using AngApi.DAL.ViewModel;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Internal;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AngApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemDetailController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IItemDetail blItemDetail;
        private IHostingEnvironment _hostingEnvironment;
        public ItemDetailController(IMapper mapper, IItemDetail itemDetail, IHostingEnvironment hostingEnvironment)
        {
            this.mapper = mapper;
            this.blItemDetail = itemDetail;
            this._hostingEnvironment = hostingEnvironment;
        }

        // GET: api/ItemDetail
        [HttpGet]
        public IEnumerable<ItemDetailViewModel> Get()
        {
            var itemDetails = blItemDetail.GetItemDetails();
            return mapper.Map<IEnumerable<ItemDetail>, IEnumerable<ItemDetailViewModel>>(itemDetails);
        }



        // GET: api/ItemDetail/5
        [HttpGet("{id}")]
        public ItemDetailViewModel Get(int id)
        {
            var _itemDetail = blItemDetail.GetItemDetail(id);
            return mapper.Map<ItemDetail, ItemDetailViewModel>(_itemDetail);
        }

        // POST: api/ItemDetail
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] ItemDetailViewModel itemDetailViewModel)
        {

            if (itemDetailViewModel.Id >= 0)

            {
                try
                {
                    string uniquefilename = null;
                    if (itemDetailViewModel.PhotoFile != null)
                    { // if upload new photo
                        string uploadsFolder = Path.Combine(_hostingEnvironment.WebRootPath, "Images");
                        uniquefilename = Guid.NewGuid().ToString() + "_" + itemDetailViewModel.PhotoFile.FileName;
                        string filepath = Path.Combine(uploadsFolder, uniquefilename);
                        itemDetailViewModel.PhotoFile.CopyTo(new FileStream(filepath, FileMode.Create));
                        // then remove the existing one 
                        if (itemDetailViewModel.Photo != null)
                        {
                            // unlink photo while updating photo
                            string removeFilename = itemDetailViewModel.Photo;
                            // var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot\\image\\Programcilar", "controlller.jpg");
                            var path = Path.Combine(_hostingEnvironment.WebRootPath, "Images", removeFilename);

                            if (System.IO.File.Exists(path))
                            {
                                System.IO.File.Delete(path);
                            }
                        }

                        itemDetailViewModel.Photo = uniquefilename;

                    }
                    else
                    { // when update form without photo uploading, keep the name as it is
                        itemDetailViewModel.Photo = itemDetailViewModel.Photo;
                    }



                    var _itemDetail = blItemDetail.UpsertItemDetail(itemDetailViewModel);
                }
                catch (Exception ex)
                {

                    throw ex;
                }
                
                
            }

            return CreatedAtAction("Get", new { id = itemDetailViewModel.Id }, itemDetailViewModel);



        }



        // DELETE: api/ItemDetail/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            // var itemDetail = await _context.ItemDetails.FindAsync(id);
            try
            {
                var itemDetail = blItemDetail.GetItemDetail(id);
                if (itemDetail == null)
                {
                    return NotFound();
                }
                // unlink photo
                if (itemDetail.Photo != null)
                {
                    // unlink photo while updating photo
                    string removeFilename = itemDetail.Photo;
                    // var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot\\image\\Programcilar", "controlller.jpg");
                    var path = Path.Combine(_hostingEnvironment.WebRootPath, "Images", removeFilename);

                    if (System.IO.File.Exists(path))
                    {
                        System.IO.File.Delete(path);
                    }
                }
                //_context.ItemDetails.Remove(itemDetail);
                blItemDetail.DeleteItemDetail(itemDetail.Id);
                return Ok(itemDetail);
            }
            catch (Exception ex)
            {

                throw ex;
            }
            
        }
    }
}