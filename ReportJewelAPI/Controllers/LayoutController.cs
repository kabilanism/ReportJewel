
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReportJewelAPI.Data.DTOs;
using ReportJewelAPI.Data.Repositories.Interfaces;
using ReportJewelAPI.Entities;
using ReportJewelAPI.Extensions;
using ReportJewelAPI.Helpers;

namespace ReportJewelAPI.Controllers
{
  [Authorize]
  public class LayoutController : BaseApiController
  {
    private readonly ILayoutRepository _layoutRepository;
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public LayoutController(
      ILayoutRepository layoutRepository,
      IUserRepository userRepository,
      IMapper mapper
    )
    {
      _layoutRepository = layoutRepository;
      _userRepository = userRepository;
      _mapper = mapper;
    }

    [HttpGet("list")]
    public async Task<ActionResult<PagedList<Layout>>> GetLayouts([FromQuery] UserParams userParams)
    {
      userParams.UserId = User.GetUserId();

      var layouts = await _layoutRepository.GetLayoutsAsync(userParams);
      Response.AddPaginationHeader(new PaginationHeader(layouts.CurrentPage, layouts.PageSize, layouts.TotalCount, layouts.TotalPages));

      return Ok(layouts);
    }

    [HttpPut("update")]
    public async Task<ActionResult> UpdateLayout(LayoutUpdateDto layoutUpdateDto)
    {
      var layout = await _layoutRepository.GetLayoutByIdAsync(layoutUpdateDto.Id);
      if (layout == null)
      {
        return NotFound();
      }

      _mapper.Map(layoutUpdateDto, layout);

      if (await _layoutRepository.SaveChangesAsync())
      {
        return NoContent();
      }

      return BadRequest("Failed to update layout.");
    }

    [HttpPost("add")]
    public async Task<ActionResult<LayoutDto>> AddLayout(LayoutAddDto layoutAddDto)
    {
      var user = await _userRepository.GetUserByIdAsync(layoutAddDto.UserId);
      if (user == null)
      {
        return BadRequest("User does not exist.");
      }

      var newLayout = new Layout
      {
        UserId = layoutAddDto.UserId,
        Name = layoutAddDto.Name,
        Description = layoutAddDto.Description
      };

      await _layoutRepository.AddLayoutAsync(newLayout);

      if (await _userRepository.SaveChangesAsync())
      {
        var newLayoutDto = _mapper.Map<LayoutDto>(newLayout);
        return Ok(newLayoutDto);
      }

      return BadRequest("Failed to add new layout.");
    }

    [HttpDelete("delete/{id}")]
    public async Task<ActionResult> DeleteLayout(int id)
    {
      var layout = await _layoutRepository.GetLayoutByIdAsync(id);
      if (layout == null)
      {
        return NotFound();
      }

      _layoutRepository.RemoveLayout(layout);

      if (await _layoutRepository.SaveChangesAsync())
      {
        return NoContent();
      }

      return BadRequest("Failed to delete layout.");
    }

    [HttpPost("control/add")]
    public async Task<ActionResult<LayoutControlDto>> AddControl(LayoutControlAddDto controlAddDto)
    {
      var newControl = _mapper.Map<LayoutControl>(controlAddDto);
      await _layoutRepository.AddControlAsync(newControl);

      if (await _layoutRepository.SaveChangesAsync())
      {
        var newControlDto = _mapper.Map<LayoutControlDto>(newControl);
        return Ok(newControlDto);
      }

      return BadRequest("Failed to add new control.");
    }

    [HttpPut("control/update")]
    public async Task<ActionResult> UpdateControl(LayoutControlDto controlUpdateDto)
    {
      var control = await _layoutRepository.GetControlByIdAsync(controlUpdateDto.Id);
      if (control == null)
      {
        return NotFound();
      }

      _mapper.Map(controlUpdateDto, control);

      if (await _layoutRepository.SaveChangesAsync())
      {
        return NoContent();
      }

      return BadRequest("Failed to update control.");
    }

    [HttpDelete("control/delete/{controlId}")]
    public async Task<ActionResult> DeleteControl(int controlId)
    {
      var control = await _layoutRepository.GetControlByIdAsync(controlId);
      if (control == null)
      {
        return NotFound();
      }

      _layoutRepository.RemoveControl(control);

      if (await _layoutRepository.SaveChangesAsync())
      {
        return NoContent();
      }

      return BadRequest("Failed to delete control.");
    }
  }
}

