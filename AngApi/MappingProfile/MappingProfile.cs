using AngApi.DAL.Model;
using AngApi.DAL.ViewModel;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngApi.MappingProfile
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Employee, EmployeeViewModel>();
            CreateMap<Calculation, CalculationViewModel>();
            CreateMap<ItemDetail, ItemDetailViewModel>();
        }
    }
}
