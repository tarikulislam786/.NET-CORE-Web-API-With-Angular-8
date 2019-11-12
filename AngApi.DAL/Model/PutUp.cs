using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace AngApi.DAL.Model
{
   public class PutUp
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(256)")]
        public string Subject { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string Description { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(256)")]
        public string ReferenceNumber { get; set; }

        [Required] 
        public int ReceiveType { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(256)")]
        public string VisitorName { get; set; }

        [Required]
        public int VisitorMobileNumber { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(256)")]
        public string VisitorMobileEmail { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(256)")]
        public string SendTo { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(256)")]
        public string SendingToUnitName { get; set; }

        

        [Column(TypeName = "date")]
        public DateTime? PutUpDate { get; set; }


        [Required]
        [Column(TypeName = "nvarchar(256)")]
        public string BarCode { get; set; }

        [Required]
        public int Status { get; set; }

        [Column(TypeName = "date")]
        public DateTime? CreatedDate { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ModifiedDate { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string CreatedBy { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string ModifiedBy { get; set; }

        public PutUp()
        {
            this.CreatedDate = DateTime.UtcNow;
            this.ModifiedDate = DateTime.UtcNow;
        }
    }
}
