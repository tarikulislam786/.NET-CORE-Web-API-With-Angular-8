using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace AngApi.DAL.Model
{
    public class MovementDetail
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int PutUpId { get; set; }
        [Required]
        public int StaffId { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(255)")]
        public string Name { get; set; }


        [Required]
        [Column(TypeName = "nvarchar(255)")]
        public string SeqNo { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string Comments { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(max)")]
        public string ReceiveData { get; set; }


        [Column(TypeName = "date")]
        public DateTime? ActionDate { get; set; }


        [Column(TypeName = "date")]
        public DateTime? CreatedDate { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ModifiedDate { get; set; }
        [Column(TypeName = "nvarchar(255)")]
        public string CreatedBy { get; set; }
        [Column(TypeName = "nvarchar(255)")]
        public string ModifiedBy { get; set; }
    }
}
