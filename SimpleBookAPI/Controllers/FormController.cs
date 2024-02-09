
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
    public async Task<ActionResult<List<FormDto>>> GetForms([FromQuery] int userId)
    {
      var forms = await _formRepository.GetFormsByUserIdAsync(userId);
      var formsDto = _mapper.Map<List<FormDto>>(forms);

      return formsDto;
    }

    [HttpPut("update")]
    public async Task<ActionResult> UpdateForm(FormUpdateDto formUpdateDto)
    {
      var form = await _formRepository.GetFormByIdAsync(formUpdateDto.Id);
      if (form == null)
      {
        return NotFound();
      }

      _mapper.Map(formUpdateDto, form);

      if (await _formRepository.SaveChangesAsync())
      {
        return NoContent();
      }

      return BadRequest("Failed to update template.");
    }

    [HttpPut("control/update")]
    public async Task<ActionResult> UpdateControl(FormControlDto controlUpdateDto)
    {
      var control = await _formRepository.GetControlByIdAsync(controlUpdateDto.Id);
      if (control == null)
      {
        return NotFound();
      }

      _mapper.Map(controlUpdateDto, control);

      if (await _formRepository.SaveChangesAsync())
      {
        return NoContent();
      }

      return BadRequest("Failed to update control");
    }
  }
}

