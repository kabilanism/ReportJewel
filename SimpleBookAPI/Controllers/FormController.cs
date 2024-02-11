﻿
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SimpleBookAPI.Data.DTOs;
using SimpleBookAPI.Data.Repositories.Interfaces;
using SimpleBookAPI.Entities;

namespace SimpleBookAPI.Controllers
{
  public class FormController : BaseApiController
  {
    private readonly IFormRepository _formRepository;
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public FormController(
      IFormRepository formRepository,
      IUserRepository userRepository,
      IMapper mapper
    )
    {
      _formRepository = formRepository;
      _userRepository = userRepository;
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

    [HttpPost("add")]
    public async Task<ActionResult<FormDto>> AddForm(FormAddDto formAddDto)
    {
      var user = await _userRepository.GetUserByIdAsync(formAddDto.UserId);
      if (user == null)
      {
        return BadRequest("User does not exist");
      }

      var newForm = new Form
      {
        UserId = formAddDto.UserId,
        Name = formAddDto.Name,
        Description = formAddDto.Description
      };

      await _formRepository.AddFormAsync(newForm);

      if (await _userRepository.SaveChangesAsync())
      {
        var newFormDto = _mapper.Map<FormDto>(newForm);
        return Ok(newFormDto);
      }

      return BadRequest("Failed to add new report.");
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

