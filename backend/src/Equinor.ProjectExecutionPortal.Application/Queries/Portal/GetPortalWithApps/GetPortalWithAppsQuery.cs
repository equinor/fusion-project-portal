﻿using AutoMapper;
using Equinor.ProjectExecutionPortal.Application.Services.AppService;
using Equinor.ProjectExecutionPortal.Domain.Common.Exceptions;
using Equinor.ProjectExecutionPortal.Domain.Infrastructure;
using Equinor.ProjectExecutionPortal.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Equinor.ProjectExecutionPortal.Application.Queries.Portal.GetPortalWithApps;

public class GetPortalWithAppsQuery : QueryBase<PortalDto?>
{
    public GetPortalWithAppsQuery()
    {
    }

    public class Handler : IRequestHandler<GetPortalWithAppsQuery, PortalDto?>
    {
        private readonly IReadWriteContext _context;
        private readonly IMapper _mapper;
        private readonly IAppService _appService;

        public Handler(IReadWriteContext context, IMapper mapper, IAppService appService)
        {
            _context = context;
            _mapper = mapper;
            _appService = appService;
        }

        public async Task<PortalDto?> Handle(GetPortalWithAppsQuery request, CancellationToken cancellationToken)
        {
            // Temp POC: Seed db if no portals is found
            if (!await _context.Set<Domain.Entities.Portal>().AnyAsync(cancellationToken))
            {
                await TempMethodSeedDb(cancellationToken);
            }

            var enitity = await _context.Set<Domain.Entities.Portal>()
                .Include(portal => portal.WorkSurfaces.OrderBy(workSurface => workSurface.Order))
                    .ThenInclude(workSurface => workSurface.AppGroups.OrderBy(appGroup => appGroup.Order))
                        .ThenInclude(appGroup => appGroup.Apps.OrderBy(application => application.Order))
                            .ThenInclude(x => x.OnboardedApp)
                .AsNoTracking()
                .FirstOrDefaultAsync(cancellationToken) ?? throw new NotFoundException();

            var portal = _mapper.Map<Domain.Entities.Portal, PortalDto>(enitity);

            var enrichedPortal = await _appService.EnrichPortalWithFusionAppData(portal, cancellationToken);

            return enrichedPortal;
        }

        // TEMP TEMP TEMP POC
        private async Task TempMethodSeedDb(CancellationToken cancellationToken)
        {
            // Portal + Work Surfaces

            var portal = new Domain.Entities.Portal("Project Execution Portal", "A kewl portal description");

            var workSurface1 = new Domain.Entities.WorkSurface("portfolio-management", "Portfolio Management", "< DG 3", "Here you can find all the tools that you need", 0, "<svg width=\"318\" height=\"305\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M98 175H48v-7.925c23.34-2.882 39.276-12.072 50-21.381V175Z\" fill=\"#FF6670\"/><path d=\"M32.5 168c36 0 57.5-14 70-26.5s14.5-36.5 50-36.5 34.5 21.5 49.5 36.5 39.5 26.5 68.5 26.5M32 174h239M49 134v46M99 134v46\" stroke=\"#3D3D3D\"/><path d=\"M126.719 264.672c.288.192.528.072.528-.288v-2.544c0-.24-.096-.384-.312-.528l-4.8-2.808 4.8-2.808c.216-.144.312-.288.312-.528v-2.544c0-.36-.24-.48-.528-.288l-7.704 4.92a.576.576 0 0 0-.288.528v1.44c0 .24.096.408.288.528l7.704 4.92ZM141.492 267c4.44 0 7.776-3.096 7.776-8.4s-3.336-8.4-7.776-8.4h-5.52c-.288 0-.456.168-.456.432v15.936c0 .264.168.432.456.432h5.52Zm-2.88-13.968h2.664c2.712 0 4.848 1.656 4.848 5.568s-2.136 5.568-4.848 5.568h-2.664v-11.136Zm22.599 4.464c-.24 0-.432.096-.504.36l-.72 1.968c-.12.312.024.504.336.504h4.776c-.528 2.472-2.208 4.08-4.992 4.08-3.48 0-5.496-2.472-5.496-5.808s2.184-5.808 5.496-5.808c1.824 0 3.336.864 4.248 1.872.192.216.408.216.624.048l1.68-1.368c.216-.168.24-.408.072-.624-1.632-1.872-3.96-2.808-6.576-2.808-4.896 0-8.688 3.696-8.688 8.688 0 4.992 3.624 8.688 8.688 8.688 4.776 0 7.92-3.336 8.136-8.112v-1.248c0-.264-.168-.432-.456-.432h-6.624Zm19.862 9.792c3.96 0 6.384-2.52 6.384-5.76 0-2.952-1.872-4.944-4.8-5.208l3.408-3.36c.168-.168.216-.336.216-.552v-1.776c0-.264-.144-.432-.432-.432h-8.64c-.24 0-.432.096-.504.36l-.72 1.968c-.12.312.024.504.336.504h6.312l-3.264 3.192a.76.76 0 0 0-.216.552v1.536c0 .288.144.456.432.456h1.056c2.136 0 3.672.84 3.672 2.76 0 1.656-1.152 2.904-3.288 2.904-1.872 0-3.264-.768-4.224-1.824-.24-.264-.432-.216-.576.12l-.72 1.968c-.072.24-.024.408.144.576 1.104 1.104 3.12 2.016 5.424 2.016Z\" fill=\"#3D3D3D\"/></svg>");
            var workSurface2 = new Domain.Entities.WorkSurface("project-execution", "Project Execution", "DG 3 - DG 4", "Go to this phase to work with projects that are beyond DG3", 1, "<svg width=\"305\" height=\"305\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M155.245 41.941c0-2.006 2.625-2.763 3.693-1.064l37.477 59.635c.201.319.307.688.307 1.064V149a2 2 0 0 1-2 2h-37.477a2 2 0 0 1-2-2V41.941Z\" fill=\"#FF6670\"/><mask id=\"a\" fill=\"#fff\"><path d=\"M196.722 101.576c0-.376-.106-.745-.307-1.064l-37.477-59.635c-1.068-1.699-3.693-.942-3.693 1.065V149a2 2 0 0 0 2 2h37.477a2 2 0 0 0 2-2v-47.424ZM226 157a2 2 0 0 0-2-2H81a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h18.569a2 2 0 0 1 1.999 2v37a2 2 0 0 0 2 2h10.639a2 2 0 0 0 2-2v-37a2 2 0 0 1 2-2h68.586a2 2 0 0 1 2 2v37a2 2 0 0 0 2 2h10.639a2 2 0 0 0 2-2v-37a2 2 0 0 1 2-2H224a2 2 0 0 0 2-2v-20Zm-125-52a2 2 0 0 1 2-2h45a2 2 0 0 1 2 2v44a2 2 0 0 1-2 2h-45a2 2 0 0 1-2-2v-44Zm49.365-35a2 2 0 0 0-2-2h-25.888a2 2 0 0 0-2 2v27a2 2 0 0 0 2 2h25.888a2 2 0 0 0 2-2V70Z\"/></mask><path d=\"M224 179v-4 4Zm-18.568 0v4-4Zm-105.863 0v-4 4ZM81 179v4-4Zm115.415-78.488 3.387-2.128-3.387 2.128Zm-40.864-57.506 37.478 59.635 6.773-4.257-37.477-59.635-6.774 4.257ZM159.245 149V41.942h-8V149h8Zm35.477-2h-37.477v8h37.477v-8Zm-2-45.424V149h8v-47.424h-8ZM81 159h143v-8H81v8Zm2 18v-20h-8v20h8Zm16.569-2H81v8h18.569v-8Zm5.999 43v-37h-8v37h8Zm8.639-2h-10.639v8h10.639v-8Zm-2-35v37h8v-37h-8Zm74.586-6h-68.586v8h68.586v-8Zm6 43v-37h-8v37h8Zm8.639-2h-10.639v8h10.639v-8Zm-2-35v37h8v-37h-8ZM224 175h-18.568v8H224v-8Zm-2-18v20h8v-20h-8Zm-74-58h-45v8h45v-8Zm6 50v-44h-8v44h8Zm-51 6h45v-8h-45v8Zm-6-50v44h8v-44h-8Zm25.477-33h25.888v-8h-25.888v8Zm2 25V70h-8v27h8Zm23.888-2h-25.888v8h25.888v-8Zm-2-25v27h8V70h-8Zm2 33a6 6 0 0 0 6-6h-8a2 2 0 0 1 2-2v8Zm-31.888-6a6 6 0 0 0 6 6v-8a2 2 0 0 1 2 2h-8Zm31.888-25a2 2 0 0 1-2-2h8a6 6 0 0 0-6-6v8Zm-25.888-8a6 6 0 0 0-6 6h8a2 2 0 0 1-2 2v-8ZM103 147a2 2 0 0 1 2 2h-8a6 6 0 0 0 6 6v-8Zm43 2a2 2 0 0 1 2-2v8a6 6 0 0 0 6-6h-8Zm-43-50a6 6 0 0 0-6 6h8a2 2 0 0 1-2 2v-8Zm45 8a2 2 0 0 1-2-2h8a6 6 0 0 0-6-6v8Zm76 76a6 6 0 0 0 6-6h-8a2 2 0 0 1 2-2v8Zm-16.568-2a2 2 0 0 1-2 2v-8a6 6 0 0 0-6 6h8Zm-6 43a6 6 0 0 0 6-6h-8a2 2 0 0 1 2-2v8Zm-16.639-6a6 6 0 0 0 6 6v-8a2 2 0 0 1 2 2h-8Zm2-35a2 2 0 0 1-2-2h8a6 6 0 0 0-6-6v8Zm-66.586-2a2 2 0 0 1-2 2v-8a6 6 0 0 0-6 6h8Zm-6 43a6 6 0 0 0 6-6h-8a2 2 0 0 1 2-2v8Zm-16.638-6a6 6 0 0 0 5.999 6v-8a2 2 0 0 1 2 2h-8Zm2-35a2 2 0 0 1-2-2h7.999a6 6 0 0 0-6-6v8ZM75 177a6 6 0 0 0 6 6v-8a2 2 0 0 1 2 2h-8Zm149-18a2 2 0 0 1-2-2h8a6 6 0 0 0-6-6v8Zm-143-8a6 6 0 0 0-6 6h8a2 2 0 0 1-2 2v-8Zm113.722 4a6 6 0 0 0 6-6h-8a2 2 0 0 1 2-2v8Zm-43.477-6a6 6 0 0 0 6 6v-8a2 2 0 0 1 2 2h-8Zm41.784-46.359a1.997 1.997 0 0 1-.307-1.065h8a6 6 0 0 0-.92-3.192l-6.773 4.257Zm-30.704-63.892c-3.203-5.097-11.08-2.828-11.08 3.193h8c0 2.006-2.626 2.763-3.694 1.064l6.774-4.257Z\" fill=\"#3D3D3D\" mask=\"url(#a)\"/><path d=\"M97.594 267c4.44 0 7.776-3.096 7.776-8.4s-3.336-8.4-7.776-8.4h-5.52c-.288 0-.456.168-.456.432v15.936c0 .264.168.432.456.432h5.52Zm-2.88-13.968h2.664c2.712 0 4.848 1.656 4.848 5.568s-2.136 5.568-4.848 5.568h-2.664v-11.136Zm22.599 4.464c-.24 0-.432.096-.504.36l-.72 1.968c-.12.312.024.504.336.504h4.776c-.528 2.472-2.208 4.08-4.992 4.08-3.48 0-5.496-2.472-5.496-5.808s2.184-5.808 5.496-5.808c1.824 0 3.336.864 4.248 1.872.192.216.408.216.624.048l1.68-1.368c.216-.168.24-.408.072-.624-1.632-1.872-3.96-2.808-6.576-2.808-4.896 0-8.688 3.696-8.688 8.688 0 4.992 3.624 8.688 8.688 8.688 4.776 0 7.92-3.336 8.136-8.112v-1.248c0-.264-.168-.432-.456-.432h-6.624Zm19.861 9.792c3.96 0 6.384-2.52 6.384-5.76 0-2.952-1.872-4.944-4.8-5.208l3.408-3.36c.168-.168.216-.336.216-.552v-1.776c0-.264-.144-.432-.432-.432h-8.64c-.24 0-.432.096-.504.36l-.72 1.968c-.12.312.024.504.336.504h6.312l-3.264 3.192a.76.76 0 0 0-.216.552v1.536c0 .288.144.456.432.456h1.056c2.136 0 3.672.84 3.672 2.76 0 1.656-1.152 2.904-3.288 2.904-1.872 0-3.264-.768-4.224-1.824-.24-.264-.432-.216-.576.12l-.72 1.968c-.072.24-.024.408.144.576 1.104 1.104 3.12 2.016 5.424 2.016Zm21.259-6.312c.288 0 .456-.168.456-.432v-1.968c0-.264-.168-.432-.456-.432h-6.504c-.264 0-.432.168-.432.432v1.968c0 .264.168.432.432.432h6.504ZM173.321 267c4.44 0 7.776-3.096 7.776-8.4s-3.336-8.4-7.776-8.4h-5.52c-.288 0-.456.168-.456.432v15.936c0 .264.168.432.456.432h5.52Zm-2.88-13.968h2.664c2.712 0 4.848 1.656 4.848 5.568s-2.136 5.568-4.848 5.568h-2.664v-11.136Zm22.598 4.464c-.24 0-.432.096-.504.36l-.72 1.968c-.12.312.024.504.336.504h4.776c-.528 2.472-2.208 4.08-4.992 4.08-3.48 0-5.496-2.472-5.496-5.808s2.184-5.808 5.496-5.808c1.824 0 3.336.864 4.248 1.872.192.216.408.216.624.048l1.68-1.368c.216-.168.24-.408.072-.624-1.632-1.872-3.96-2.808-6.576-2.808-4.896 0-8.688 3.696-8.688 8.688 0 4.992 3.624 8.688 8.688 8.688 4.776 0 7.92-3.336 8.136-8.112v-1.248c0-.264-.168-.432-.456-.432h-6.624ZM212.145 267c.288 0 .432-.168.432-.432V263.4h1.224c.24 0 .432-.096.504-.36l.72-1.968c.12-.312-.024-.504-.336-.504h-2.112v-9.936c0-.264-.144-.432-.432-.432h-1.992a.607.607 0 0 0-.528.264l-7.56 10.392a.886.886 0 0 0-.168.552v1.56c0 .264.144.432.432.432h7.152v3.168c0 .264.168.432.456.432h2.208Zm-2.664-12.144v5.712h-4.152l4.152-5.712Z\" fill=\"#3D3D3D\"/></svg>");
            var workSurface3 = new Domain.Entities.WorkSurface("another-phase", "Another phase", "DG X", "Some other sub text", 2, "<svg width=\"305\" height=\"305\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m155.852 98.705-3.659-42.075-3.55 40.826L119.5 132.15l32.159-27.013 32.596 27.381-28.403-33.813Zm53.656 57.657c.786.936-.473 2.195-1.409 1.409L156.3 114.26l11.392 116.329C169.79 232.641 171.87 234 175 234c4.25 0 6.564-2.507 9.617-5.849 2.952-3.231 6.549-7.151 13.133-7.151 3.256 0 5.663.959 7.612 2.438 1.672 1.27 2.976 2.915 4.121 4.36l.178.224.183.23c1.293 1.62 2.486 3.011 4.073 4.037 1.537.992 3.56 1.711 6.583 1.711a2 2 0 1 1 0 4c-3.727 0-6.516-.906-8.753-2.351-2.186-1.412-3.728-3.271-5.029-4.901l-.309-.389-.021-.025-.001-.002c-1.206-1.516-2.196-2.76-3.444-3.708-1.263-.958-2.824-1.624-5.193-1.624-4.666 0-7.194 2.58-10.18 5.849l-.125.138-.149.163c-2.83 3.105-6.243 6.85-12.296 6.85-6.053 0-9.466-3.745-12.296-6.85l-.165-.182-.109-.119c-2.986-3.269-5.514-5.849-10.18-5.849-4.7 0-7.485 2.625-10.583 5.879l-.504.533-.001.001c-2.828 2.991-6.226 6.587-11.662 6.587-5.648 0-9.954-3.87-13.386-7.028l-.529-.488c-1.599-1.476-3.034-2.8-4.488-3.81-1.593-1.107-2.988-1.674-4.347-1.674-1.277 0-2.269.499-3.36 1.503-.795.731-1.486 1.566-2.306 2.557h-.001c-.444.537-.927 1.12-1.484 1.757-1.489 1.702-3.319 3.525-5.847 4.907C91.204 237.116 88.058 238 84 238a2 2 0 1 1 0-4c3.442 0 5.92-.741 7.834-1.786 1.933-1.056 3.4-2.483 4.755-4.031.382-.437.778-.914 1.185-1.404.931-1.121 1.916-2.307 2.907-3.219 1.557-1.434 3.471-2.56 6.069-2.56 2.516 0 4.715 1.058 6.63 2.389 1.697 1.179 3.344 2.701 4.902 4.14v.001h.001l.361.334.179.164c3.631 3.342 6.825 5.972 10.677 5.972 2.577 0 4.459-1.169 6.448-3.017l11.806-117.342-52.098 43.762c-.936.786-2.195-.473-1.409-1.409l50.521-60.144 6.429-73.937c.106-1.218 1.887-1.218 1.993 0l6.538 75.187 49.78 59.262Zm-69.1 70.083c2.826-2.768 6.397-5.445 11.842-5.445 5.071 0 8.371 2.326 10.968 4.871L152 111.391l-11.592 115.054Z\" fill=\"#3D3D3D\"/><path d=\"M152 111.392 166.042 232c-1.848-2.925-7.342-8.775-14.542-8.775s-12.032 5.895-13.548 8.842L152 111.392Z\" fill=\"#FF6670\"/><path d=\"M97.594 267c4.44 0 7.776-3.096 7.776-8.4s-3.336-8.4-7.776-8.4h-5.52c-.288 0-.456.168-.456.432v15.936c0 .264.168.432.456.432h5.52Zm-2.88-13.968h2.664c2.712 0 4.848 1.656 4.848 5.568s-2.136 5.568-4.848 5.568h-2.664v-11.136Zm22.599 4.464c-.24 0-.432.096-.504.36l-.72 1.968c-.12.312.024.504.336.504h4.776c-.528 2.472-2.208 4.08-4.992 4.08-3.48 0-5.496-2.472-5.496-5.808s2.184-5.808 5.496-5.808c1.824 0 3.336.864 4.248 1.872.192.216.408.216.624.048l1.68-1.368c.216-.168.24-.408.072-.624-1.632-1.872-3.96-2.808-6.576-2.808-4.896 0-8.688 3.696-8.688 8.688 0 4.992 3.624 8.688 8.688 8.688 4.776 0 7.92-3.336 8.136-8.112v-1.248c0-.264-.168-.432-.456-.432h-6.624Zm19.861 9.792c3.96 0 6.384-2.52 6.384-5.76 0-2.952-1.872-4.944-4.8-5.208l3.408-3.36c.168-.168.216-.336.216-.552v-1.776c0-.264-.144-.432-.432-.432h-8.64c-.24 0-.432.096-.504.36l-.72 1.968c-.12.312.024.504.336.504h6.312l-3.264 3.192a.76.76 0 0 0-.216.552v1.536c0 .288.144.456.432.456h1.056c2.136 0 3.672.84 3.672 2.76 0 1.656-1.152 2.904-3.288 2.904-1.872 0-3.264-.768-4.224-1.824-.24-.264-.432-.216-.576.12l-.72 1.968c-.072.24-.024.408.144.576 1.104 1.104 3.12 2.016 5.424 2.016Zm21.259-6.312c.288 0 .456-.168.456-.432v-1.968c0-.264-.168-.432-.456-.432h-6.504c-.264 0-.432.168-.432.432v1.968c0 .264.168.432.432.432h6.504ZM173.321 267c4.44 0 7.776-3.096 7.776-8.4s-3.336-8.4-7.776-8.4h-5.52c-.288 0-.456.168-.456.432v15.936c0 .264.168.432.456.432h5.52Zm-2.88-13.968h2.664c2.712 0 4.848 1.656 4.848 5.568s-2.136 5.568-4.848 5.568h-2.664v-11.136Zm22.598 4.464c-.24 0-.432.096-.504.36l-.72 1.968c-.12.312.024.504.336.504h4.776c-.528 2.472-2.208 4.08-4.992 4.08-3.48 0-5.496-2.472-5.496-5.808s2.184-5.808 5.496-5.808c1.824 0 3.336.864 4.248 1.872.192.216.408.216.624.048l1.68-1.368c.216-.168.24-.408.072-.624-1.632-1.872-3.96-2.808-6.576-2.808-4.896 0-8.688 3.696-8.688 8.688 0 4.992 3.624 8.688 8.688 8.688 4.776 0 7.92-3.336 8.136-8.112v-1.248c0-.264-.168-.432-.456-.432h-6.624ZM212.145 267c.288 0 .432-.168.432-.432V263.4h1.224c.24 0 .432-.096.504-.36l.72-1.968c.12-.312-.024-.504-.336-.504h-2.112v-9.936c0-.264-.144-.432-.432-.432h-1.992a.607.607 0 0 0-.528.264l-7.56 10.392a.886.886 0 0 0-.168.552v1.56c0 .264.144.432.432.432h7.152v3.168c0 .264.168.432.456.432h2.208Zm-2.664-12.144v5.712h-4.152l4.152-5.712Z\" fill=\"#3D3D3D\"/></svg>");

            portal.AddWorkSurface(workSurface1);
            portal.AddWorkSurface(workSurface2);
            portal.AddWorkSurface(workSurface3);

            await _context.Set<Domain.Entities.Portal>().AddAsync(portal, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            // Onboarded apps

            var meetingsApp = new Domain.Entities.OnboardedApp("meetings");
            var reviewsApp = new Domain.Entities.OnboardedApp("reviews");
            var tasksApp = new Domain.Entities.OnboardedApp("tasks");
            var orgChartApp = new Domain.Entities.OnboardedApp("one-equinor");
            var handoverGardenApp = new Domain.Entities.OnboardedApp("handover-garden");
            var workOrderGardenApp = new Domain.Entities.OnboardedApp("workorder-garden");
            var demoApp = new Domain.Entities.OnboardedApp("test-app");

            await _context.Set<Domain.Entities.OnboardedApp>().AddRangeAsync(meetingsApp, reviewsApp, tasksApp, orgChartApp, handoverGardenApp, workOrderGardenApp, demoApp);

            await _context.SaveChangesAsync(cancellationToken);

            // Add apps to work surfaces

            var collaborationAppGroup = new Domain.Entities.WorkSurfaceAppGroup("Collaboration", 0, "#E24973");
            var projectInformationAppGroup = new Domain.Entities.WorkSurfaceAppGroup("Project Information", 1, "#6D2FD5");
            var ccAppGroup = new Domain.Entities.WorkSurfaceAppGroup("Construction and Commissioning", 2, "#0084C4");
            var demoAppGroup = new Domain.Entities.WorkSurfaceAppGroup("Demo", 3, "#00977B");

            workSurface2.AddAppGroup(collaborationAppGroup);
            workSurface2.AddAppGroup(projectInformationAppGroup);
            workSurface2.AddAppGroup(ccAppGroup);
            workSurface2.AddAppGroup(demoAppGroup);

            await _context.SaveChangesAsync(cancellationToken);

            var meetingsWsApp = new Domain.Entities.WorkSurfaceApp(meetingsApp.Id, null, 0, workSurface2.Id);
            var reviewsWsApp = new Domain.Entities.WorkSurfaceApp(reviewsApp.Id, null, 1, workSurface2.Id);
            var tasksWsApp = new Domain.Entities.WorkSurfaceApp(tasksApp.Id, null, 0, workSurface2.Id);
            var orgChartWsApp = new Domain.Entities.WorkSurfaceApp(orgChartApp.Id, null, 1, workSurface2.Id);
            var handoverGardenWsApp = new Domain.Entities.WorkSurfaceApp(handoverGardenApp.Id, null, 0, workSurface2.Id);
            var workOrderGardenWsApp = new Domain.Entities.WorkSurfaceApp(workOrderGardenApp.Id, null, 1, workSurface2.Id);
            var demoWsApp = new Domain.Entities.WorkSurfaceApp(demoApp.Id, null, 0, workSurface2.Id);

            collaborationAppGroup.AddApp(meetingsWsApp);
            collaborationAppGroup.AddApp(reviewsWsApp);
            projectInformationAppGroup.AddApp(tasksWsApp);
            projectInformationAppGroup.AddApp(orgChartWsApp);
            ccAppGroup.AddApp(handoverGardenWsApp);
            ccAppGroup.AddApp(workOrderGardenWsApp);
            demoAppGroup.AddApp(demoWsApp);

            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}
