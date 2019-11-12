using AngApi.DAL.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AngApi.DAL.Repositories
{
    public interface IEmployeeRepository
    {
        int AddEmployee(Employee employee);
        IEnumerable<Employee> GetEmployees();
        bool DeleteEmployee(long employeeId);
        Employee GetEmployee(long Id);
        Employee GetEmployeeByName(string EmployeerName);
    }

    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly AuthenticationContext _context;
        public EmployeeRepository(AuthenticationContext context)
        {
            this._context = context;
        }
        public int AddEmployee(Employee employee)
        {
           // int id;
            _context.Employees.Add(employee);
            _context.SaveChanges(); // needed to have returned last insert id
            return employee.Id; // return last insert id
        }

        public bool DeleteEmployee(long employeeId)
        {
            var removed = false;
            Employee employee = GetEmployee(employeeId);

            if (employee != null)
            {
                removed = true;
                _context.Employees.Remove(employee);
            }

            return removed;
        }

        public Employee GetEmployee(long Id)
        {
            return _context.Employees.Where(u => u.Id == Id).FirstOrDefault();
        }

        public Employee GetEmployeeByName(string EmployeeName)
        {
            return _context.Employees.Where(u => u.Name == EmployeeName).FirstOrDefault();
        }

        public IEnumerable<Employee> GetEmployees()
        {
            return _context.Employees;
        }
    }
}
