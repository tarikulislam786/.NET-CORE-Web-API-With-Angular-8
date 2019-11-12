using AngApi.DAL.Model;
using AngApi.DAL.UnitOfWork;
using AngApi.DAL.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace AngApi.BLL
{
    public interface ICalculation
    { 
        CalculationViewModel UpsertCalculation(CalculationViewModel calculationvm);
        System.Object GetCalculations();
        bool DeleteCalculation(int calculationId);
        Calculation GetCalculation(int Id);
    }
    public class BLCalculation : ICalculation
    {
        private readonly IUnitOfWork _uow;
        public BLCalculation(IUnitOfWork uow)
        {
            this._uow = uow;
        }
        public bool DeleteCalculation(int calculationId)
        {
            _uow.Calculation.DeleteCalculation(calculationId);
            _uow.Complete();
            return true;
        }

        public Calculation GetCalculation(int Id)
        {
            if (Id <= default(int))
                throw new ArgumentException("Invalid id");

            return _uow.Calculation.GetCalculation(Id);
        }

        public System.Object GetCalculations()
        {
            return _uow.Calculation.GetCalculations();
        }

        public CalculationViewModel UpsertCalculation(CalculationViewModel calculationvm)
        {
            if (calculationvm == null)
                throw new ArgumentException("Invalid calculation");

            //if (string.IsNullOrWhiteSpace(calculationVm.UserId))
            //    throw new ArgumentException("Invalid user id");
            var _employee = _uow.Employee.GetEmployeeByName(calculationvm.Name);

            var _employeeCalculation = _uow.Calculation.GetCalculation(calculationvm.Id);
            // Add brand new user with calculation
            if(_employee == null && _employeeCalculation == null)
            {// insert user
                _employee = new Employee
                {
                   // Id = uvm.Id,
                    Name = calculationvm.Name
                };
                _uow.Employee.AddEmployee(_employee);

                int lastInsertEmployeeId = _employee.Id;

                //insert calculation

                _employeeCalculation = new Calculation
                    {
                        EmployeeId = lastInsertEmployeeId,

                        Num1 = calculationvm.Num1,
                        Num2 = calculationvm.Num2,
                        Sum = calculationvm.Num1 + calculationvm.Num2,
                        CreatedDate = DateTime.Now,
                        ModifiedDate = DateTime.Now

                    };
                    
                    // calculationvm.(_calculation);
                    _uow.Calculation.AddCalculation(_employeeCalculation);
                
            } else {
                // update process through delete and insert
                // delete calculation
                _uow.Calculation.DeleteCalculation(_employeeCalculation.Id);
                // delete user
                _uow.Employee.DeleteEmployee(_employeeCalculation.EmployeeId);
                // add user
                _employee = new Employee
                {
                    Name = calculationvm.Name
                };
                _uow.Employee.AddEmployee(_employee);

                int lastInsertEmployeeId = _employee.Id;
                // add calculation
                _employeeCalculation = new Calculation
                {
                    EmployeeId = lastInsertEmployeeId,
                    Num1 = calculationvm.Num1,
                    Num2 = calculationvm.Num2,
                    Sum = calculationvm.Num1 + calculationvm.Num2,
                    CreatedDate = DateTime.Now,
                    ModifiedDate = DateTime.Now
                };
                _uow.Calculation.AddCalculation(_employeeCalculation);
            }
            _uow.Complete();
            return calculationvm;
        }
    }
}
