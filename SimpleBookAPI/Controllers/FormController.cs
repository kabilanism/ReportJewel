using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SimpleBookAPI.Data.DTOs;
using SimpleBookAPI.Data.Repositories.Interfaces;

namespace SimpleBookAPI.Controllers
{
  public class FormController : BaseApiController
  {
    private readonly IFormRepository _formRepository;
    private readonly IMapper _mapper;

    public FormController(
      IFormRepository formRepository,
      IMapper mapper
    )
    {
      _formRepository = formRepository;
      _mapper = mapper;
    }

    [HttpGet("templates")]
    public async Task<ActionResult<List<FormDto>>> GetTemplates([FromQuery] int userId)
    {
      var forms = await _formRepository.GetFormsByUserId(userId);
      var formsDto = _mapper.Map<List<FormDto>>(forms);

      return formsDto;
    }
  }
}

