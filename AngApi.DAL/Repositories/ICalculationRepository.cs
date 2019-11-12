using AngApi.DAL.Model;
using AngApi.DAL.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AngApi.DAL.Repositories
{
    public interface ICalculationRepository
    {
        void AddCalculation(Calculation calculation);
        System.Object GetCalculations();
        bool DeleteCalculation(int calculationId);
        Calculation GetCalculation(int Id);
       // CalculationViewModel GetCalculationByName(string Name);
      //  void AddUserToCalculation(User user);
    }
    public class CalculationRepository : ICalculationRepository
    {
        private readonly AuthenticationContext _context;
        public CalculationRepository(AuthenticationContext context)
        {
            this._context = context;
        }
        public void AddCalculation(Calculation calculation)
        {
            _context.Calculations.Add(calculation);
        }

       /* public void AddUserToCalculation(User user)
        {
            throw new NotImplementedException();
        }*/

        public bool DeleteCalculation(int calculationId)
        {
            var removed = false;
            Calculation calculation = GetCalculation(calculationId);

            if (calculation != null)
            {
                removed = true;
                _context.Calculations.Remove(calculation);
            }

            return removed;
        }

        public Calculation GetCalculation(int Id)
        {
            return _context.Calculations.Where(u => u.Id == Id).FirstOrDefault();
        }

       /* public CalculationViewModel GetCalculationByName(string Name)
        {
            return _context.CalculationViewModels.Where(u => u.UserName == Name).FirstOrDefault();
        }*/
        public System.Object GetCalculations()
        {
            // return _context.Calculations;
            var calDetails = (from cal in _context.Calculations
                              join employee in _context.Employees on cal.EmployeeId equals employee.Id
                              select new
                              {
                                  Id = cal.Id,
                                  CreatedDate = cal.CreatedDate,
                                  Name = employee.Name,
                                  Num1 = cal.Num1,
                                  Num2 = cal.Num2,
                                  Sum = cal.Sum
                              }).ToList();
            return calDetails;
        }
    }
}
