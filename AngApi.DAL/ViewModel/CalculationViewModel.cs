using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace AngApi.DAL.ViewModel
{
    public class CalculationViewModel
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public int Num1 { get; set; }
        public int Num2 { get; set; }
        public int Sum { get; set; }
        public string Name { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
    }
}
